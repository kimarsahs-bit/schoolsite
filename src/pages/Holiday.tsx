import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseData } from "@/lib/supabaseHelpers";
import { useTranslation } from "@/hooks/useTranslation";

interface HolidayItem {
  id: string;
  title: string;
  description: string;
  date: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
}

const Holiday = () => {
  const { t } = useTranslation();
  const [holidayData, setHolidayData] = useState<HolidayItem[]>([]);
  const [filteredHolidays, setFilteredHolidays] = useState<HolidayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  // Load holiday data
  useEffect(() => {
    const loadHolidayData = async () => {
      try {
        setLoading(true);
        const data = await getSupabaseData<HolidayItem[]>('royal-academy-holidays', []);
        setHolidayData(data || []);
        setFilteredHolidays(data || []);
      } catch (error) {
        console.error("Error loading holiday data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHolidayData();
  }, []);

  // Filter and sort holidays based on search and sort options
  useEffect(() => {
    let result = [...holidayData];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by selected option
    if (sortBy === "date") {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredHolidays(result);
  }, [searchTerm, sortBy, holidayData]);

  const handleDownload = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      alert("No file available for download");
      return;
    }
    
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
          <p className="mt-4 text-foreground">Loading holidays...</p>
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
            Holidays & Breaks
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            View upcoming holidays, breaks, and important dates for the academic year
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
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                  className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Holiday List */}
        {filteredHolidays.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No holidays found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search" : "No holidays have been added yet"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredHolidays.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-gold/10 to-yellow-500/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-gold" />
                  </div>
                  <span className="bg-gold/10 text-gold text-xs font-semibold px-2.5 py-1 rounded-full">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>Added: {new Date(item.uploadedAt).toLocaleDateString()}</span>
                </div>
                
                {item.fileName && (
                  <Button
                    onClick={() => handleDownload(item.fileUrl, item.fileName)}
                    className="w-full bg-gradient-to-r from-gold to-yellow-500 text-white hover:from-gold/90 hover:to-yellow-500/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Notice
                  </Button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Holiday;