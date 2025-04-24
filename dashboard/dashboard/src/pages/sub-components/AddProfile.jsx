import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

// Simulación de un repositorio de CVs (en un caso real, sería una API o base de datos)
const cvRepository = {
  cvs: [],
  addCV: function(cvData) {
    this.cvs.push(cvData);
    // Guardar en localStorage para persistencia
    localStorage.setItem('cvRepository', JSON.stringify(this.cvs));
  },
  getCVs: function() {
    const savedCVs = localStorage.getItem('cvRepository');
    if (savedCVs) {
      this.cvs = JSON.parse(savedCVs);
    }
    return this.cvs;
  }
};

const AddProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    aboutMe: "",
    portfolioURL: "",
    githubURL: "",
    linkedInURL: "",
    instagramURL: "",
    twitterURL: "",
    facebookURL: "",
    avatar: null,
    resume: null
  });

  const [savedCVs, setSavedCVs] = useState(cvRepository.getCVs());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const generateResumePDF = () => {
    const doc = new jsPDF();
    
    // Estilo para el título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Professional Profile", 105, 20, { align: "center" });
    
    // Información básica
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Full Name: ${formData.fullName}`, 20, 40);
    doc.text(`Email: ${formData.email}`, 20, 50);
    doc.text(`Phone: ${formData.phone || "Not provided"}`, 20, 60);
    
    // About Me
    doc.text("About Me:", 20, 80);
    const aboutMeLines = doc.splitTextToSize(formData.aboutMe || "Not provided", 170);
    doc.text(aboutMeLines, 20, 90);
    
    // Enlaces profesionales
    doc.text("Professional Links:", 20, 130);
    doc.text(`• Portfolio: ${formData.portfolioURL || "Not provided"}`, 20, 140);
    doc.text(`• GitHub: ${formData.githubURL || "Not provided"}`, 20, 150);
    doc.text(`• LinkedIn: ${formData.linkedInURL || "Not provided"}`, 20, 160);
    doc.text(`• Instagram: ${formData.instagramURL || "Not provided"}`, 20, 170);
    doc.text(`• Twitter/X: ${formData.twitterURL || "Not provided"}`, 20, 180);
    doc.text(`• Facebook: ${formData.facebookURL || "Not provided"}`, 20, 190);
    
    return doc;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generar el PDF
      const doc = generateResumePDF();
      const pdfBlob = doc.output("blob");
      const pdfFile = new File([pdfBlob], `${formData.fullName}_resume.pdf`, { type: "application/pdf" });
      
      // Crear objeto CV para guardar
      const cvData = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date().toISOString(),
        pdfFile: URL.createObjectURL(pdfBlob),
        pdfBlob: pdfBlob
      };
      
      // Guardar en el repositorio
      cvRepository.addCV(cvData);
      
      // Actualizar estado con los CVs guardados
      setSavedCVs(cvRepository.getCVs());
      setSubmitSuccess(true);
      
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          aboutMe: "",
          portfolioURL: "",
          githubURL: "",
          linkedInURL: "",
          instagramURL: "",
          twitterURL: "",
          facebookURL: "",
          avatar: null,
          resume: null
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCV = (cv) => {
    const link = document.createElement('a');
    link.href = cv.pdfFile;
    link.download = `${cv.fullName}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full">
      <div className="grid w-[100%] gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">CV Management System</h1>
          <p className="text-balance text-muted-foreground">
            Create profiles and manage your CV repository
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario para crear nuevo perfil */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Profile</h2>
            
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="aboutMe">About Me</Label>
                <Textarea
                  id="aboutMe"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your professional background, skills, and experience"
                />
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="portfolioURL">Portfolio URL</Label>
                  <Input
                    id="portfolioURL"
                    name="portfolioURL"
                    type="url"
                    value={formData.portfolioURL}
                    onChange={handleChange}
                    placeholder="https://"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="githubURL">GitHub URL</Label>
                  <Input
                    id="githubURL"
                    name="githubURL"
                    type="url"
                    value={formData.githubURL}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="linkedInURL">LinkedIn URL</Label>
                  <Input
                    id="linkedInURL"
                    name="linkedInURL"
                    type="url"
                    value={formData.linkedInURL}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="twitterURL">Twitter/X URL</Label>
                  <Input
                    id="twitterURL"
                    name="twitterURL"
                    type="url"
                    value={formData.twitterURL}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Generating..." : "Generate CV"}
                </Button>
              </div>

              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                  CV generated successfully and added to your repository!
                </div>
              )}
            </form>
          </div>

          {/* Repositorio de CVs */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your CV Repository</h2>
            
            {savedCVs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No CVs in your repository yet.</p>
                <p>Generate your first CV using the form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedCVs.map((cv) => (
                  <div key={cv.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{cv.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{cv.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(cv.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => downloadCV(cv)}
                      >
                        Download
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                      >
                        <Link to={cv.pdfFile} target="_blank">
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;