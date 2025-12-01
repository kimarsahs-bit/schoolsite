import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSupabaseData } from "@/lib/supabaseHelpers";
import { useTranslation } from "@/hooks/useTranslation";

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

const Syllabus = () => {
  const { t } = useTranslation();
  const [syllabusData, setSyllabusData] = useState<SyllabusItem[]>([]);
  const [filteredSyllabus, setFilteredSyllabus] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Load syllabus data
  useEffect(() => {
    const loadSyllabusData = async () => {
      try {
        setLoading(true);
        const data = await getSupabaseData<SyllabusItem[]>('royal-academy-syllabus', []);
        setSyllabusData(data || []);
        setFilteredSyllabus(data || []);
      } catch (error) {
        console.error("Error loading syllabus data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSyllabusData();
  }, []);

  // Filter syllabus based on search and filters
  useEffect(() => {
    let result = [...syllabusData];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by class
    if (selectedClass !== "all") {
      result = result.filter(item => item.class === parseInt(selectedClass));
    }
    
    // Filter by subject
    if (selectedSubject !== "all") {
      result = result.filter(item => item.subject?.toLowerCase() === selectedSubject.toLowerCase());
    }
    
    setFilteredSyllabus(result);
  }, [searchTerm, selectedClass, selectedSubject, syllabusData]);

  // Get unique subjects from syllabus data
  const subjects = Array.from(new Set(syllabusData.map(item => item.subject).filter(Boolean))) as string[];

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-foreground">Loading syllabus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Navigation />
      <div className="container-wide px-4 sm:px-6 pt-24 sm:pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient-gold">
            {t("syllabus")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Access curriculum guides and syllabus documents for all classes
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search syllabus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      Class {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {subjects.length > 0 && (
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </motion.div>

        {/* Syllabus List */}
        {filteredSyllabus.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No syllabus found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedClass !== "all" || selectedSubject !== "all"
                ? "Try adjusting your search or filters"
                : "No syllabus documents have been uploaded yet"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSyllabus.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-gold/10 to-yellow-500/10 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-gold" />
                  </div>
                  <span className="bg-gold/10 text-gold text-xs font-semibold px-2.5 py-1 rounded-full">
                    Class {item.class}
                  </span>
                </div>
                
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                {item.subject && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-500/10 text-blue-500 text-xs font-medium px-2 py-1 rounded">
                      {item.subject}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>Uploaded: {new Date(item.uploadedAt).toLocaleDateString()}</span>
                  <span className="truncate ml-2">{item.fileName}</span>
                </div>
                
                <Button
                  onClick={() => handleDownload(item.fileUrl, item.fileName)}
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 text-white hover:from-gold/90 hover:to-yellow-500/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Syllabus;