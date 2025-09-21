"use client";
import { getBackendUrl } from "../lib/api";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadedFile {
  file: File;
  id: string;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
  name: string;
  size: string;
  type: string;
}

export function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [textContent, setTextContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsProcessing(true);

      for (const file of acceptedFiles) {
        // Add file to uploaded files list with processing state
        const fileId = Date.now().toString();
        const newFile: UploadedFile = {
          file,
          id: fileId,
          status: "uploading",
          progress: 0,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
        };
        setUploadedFiles((prev) => [...prev, newFile]);

        const formData = new FormData();
        formData.append("file", file);
        try {
          // Update status to processing
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, status: "processing", progress: 50 } : f
            )
          );

          const token = localStorage.getItem("token");
          const res = await fetch(`${getBackendUrl()}/api/v1/upload`, {
            method: "POST",
            body: formData,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });

          const data = await res.json();
          if (res.ok && data.document_id) {
            // Update status to complete
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === fileId
                  ? { ...f, status: "complete", progress: 100 }
                  : f
              )
            );

            // Navigate to analysis page after short delay
            setTimeout(() => {
              router.push(`/analysis/${data.document_id}`);
            }, 1000);
          } else {
            // Update status to error
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === fileId ? { ...f, status: "error", progress: 0 } : f
              )
            );
            console.error("Upload failed:", data);
          }
        } catch (err) {
          // Update status to error
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, status: "error", progress: 0 } : f
            )
          );
          console.error("Upload error:", err);
        }
      }
      setIsProcessing(false);
    },
    [router]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
      "text/plain": [".txt"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  // Removed simulateUpload logic

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleAnalyze = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${getBackendUrl()}/api/v1/upload-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text: textContent }),
      });

      const data = await res.json();
      if (res.ok && data.document_id) {
        // Navigate to analysis page
        router.push(`/analysis/${data.document_id}`);
      } else {
        console.error("Text upload failed:", data);
        // Handle error (could show toast here)
      }
    } catch (err) {
      console.error("Text upload error:", err);
      // Handle error (could show toast here)
    }
    setIsProcessing(false);
  };

  // Only allow analyze if files are present or text is entered
  const canAnalyze = uploadedFiles.length > 0 || textContent.trim().length > 0;

  return (
    <div className="space-y-8">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="text">Paste Text</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Dropzone */}
          <Card>
            <CardContent className="pt-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-lg font-medium text-primary">
                    Drop your documents here...
                  </p>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-2">
                      Drag & drop your legal documents here
                    </p>
                    <p className="text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <Button variant="outline">Choose Files</Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Supports PDF, images (PNG, JPG, GIF), and text files up to
                  10MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Uploaded Files</h3>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{file.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {file.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {file.size}
                        </p>
                        {file.status === "uploading" && (
                          <div className="space-y-1">
                            <Progress value={file.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Uploading... {Math.round(file.progress)}%
                            </p>
                          </div>
                        )}
                        {file.status === "complete" && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Upload complete</span>
                          </div>
                        )}
                        {file.status === "error" && (
                          <div className="flex items-center gap-1 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>Upload failed</span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="text" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Paste Document Text</h3>
              <Textarea
                placeholder="Paste your legal document text here..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Copy and paste text from contracts, agreements, terms of
                service, or any legal document
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analyze Button */}
      {canAnalyze && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Ready to Analyze</h3>
              <p className="text-muted-foreground mb-4">
                Your document is ready for AI analysis. We'll break down complex
                legal language into plain English.
              </p>
              <Button size="lg" onClick={handleAnalyze} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Document...
                  </>
                ) : (
                  "Analyze Document"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
