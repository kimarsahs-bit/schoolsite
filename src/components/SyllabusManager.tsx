import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getSupabaseData, setSupabaseData } from "@/lib/supabaseHelpers";
import { motion } from "framer-motion";
import { Upload, BookOpen, Download, Trash2, Plus } from "lucide-react";

interface SyllabusItem {
  id: string;
  class: number;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  subject?: string;
}

const SyllabusManager = () => {
  const [syllabusData, setSyllabusData] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    class: "1",
    title: "",
    description: "",
    subject: "",
    file: null as File | null
  });

  // Load existing syllabus data
  useEffect(() => {
    const loadSyllabusData = async () => {
      try {
        setLoading(true);
        const data = await getSupabaseData<SyllabusItem[]>('royal-academy-syllabus', []);
        setSyllabusData(data || []);
      } catch (error) {
        console.error("Error loading syllabus data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSyllabusData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert("Please select a PDF file to upload");
      return;
    }

    // Check if file is PDF
    if (!formData.file.name.toLowerCase().endsWith('.pdf')) {
      alert("Please upload a PDF file");
      return;
    }

    setUploading(true);
    setSuccess(false);
    
    try {
      // In a real implementation, you would upload the file to storage
      // For now, we'll create a mock file URL
      const mockFileUrl = URL.createObjectURL(formData.file);
      
      const newSyllabusItem: SyllabusItem = {
        id: Math.random().toString(36).substr(2, 9),
        class: parseInt(formData.class),
        title: formData.title,
        description: formData.description,
        fileUrl: mockFileUrl,
        fileName: formData.file.name,
        uploadedAt: new Date().toISOString(),
        subject: formData.subject || undefined
      };

      // Save to Supabase
      const updatedData = [...syllabusData, newSyllabusItem];
      await setSupabaseData('royal-academy-syllabus', updatedData);
      
      // Update state
      setSyllabusData(updatedData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        class: "1",
        title: "",
        description: "",
        subject: "",
        file: null
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving syllabus:", error);
      alert("Failed to save syllabus. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this syllabus?")) {
      return;
    }
    
    try {
      const updatedData = syllabusData.filter(item => item.id !== id);
      await setSupabaseData('royal-academy-syllabus', updatedData);
      setSyllabusData(updatedData);
    } catch (error) {
      console.error("Error deleting syllabus:", error);
      alert("Failed to delete syllabus. Please try again.");
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Syllabus Manager</h2>
        <p className="text-muted-foreground">
          Upload and manage syllabus documents for different classes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Syllabus
              </CardTitle>
              <CardDescription>
                Upload PDF syllabus documents for different classes (1-12)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select 
                      value={formData.class} 
                      onValueChange={(value) => handleSelectChange('class', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            Class {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject (Optional)</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Mathematics"
                      className="text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Class 10 Mathematics"
                    required
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the syllabus..."
                    rows={3}
                    required
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload PDF File</Label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <div className="flex flex-col items-start gap-2">
                    <Button 
                      type="button" 
                      onClick={triggerFileInput}
                      className="bg-gradient-to-r from-gold to-yellow-500 text-white font-bold hover:from-gold/90 hover:to-yellow-500/90 text-sm sm:text-base w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose PDF File
                    </Button>
                    <span className="text-xs sm:text-sm text-muted-foreground break-all">
                      {formData.file ? formData.file.name : "No file chosen"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only PDF files are allowed. Maximum file size: 10MB
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-gold to-yellow-500 text-white font-bold hover:from-gold/90 hover:to-yellow-500/90"
                  >
                    {uploading ? "Uploading..." : "Upload Syllabus"}
                  </Button>
                  
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 text-center"
                    >
                      Syllabus uploaded successfully!
                    </motion.div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Syllabus List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Uploaded Syllabus
              </CardTitle>
              <CardDescription>
                Manage existing syllabus documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                </div>
              ) : syllabusData.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No syllabus documents uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {syllabusData.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/10 transition-colors gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground truncate text-sm sm:text-base">
                            {item.title}
                          </h3>
                          <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full whitespace-nowrap">
                            Class {item.class}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                          <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                          {item.subject && (
                            <>
                              <span>•</span>
                              <span>{item.subject}</span>
                            </>
                          )}
                          <span className="hidden sm:inline">•</span>
                          <span className="truncate">{item.fileName}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(item.fileUrl, item.fileName)}
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SyllabusManager;