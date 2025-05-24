import { Card } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

export default function ProfileHeader() {
  const profileData = {
    name: "John Developer",
    pronouns: "he/him",
    title: "Full Stack Developer & UI/UX Designer",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and modern JavaScript frameworks. When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or hiking in the mountains.",
    additionalBio: "Currently working on innovative solutions that bridge the gap between design and development, with a focus on creating exceptional user experiences.",
    stats: {
      projects: "24",
      commits: "1.2k"
    },
    socialLinks: [
      { icon: Github, label: "github.com/johndeveloper", url: "#", color: "text-slate-700" },
      { icon: Linkedin, label: "linkedin.com/in/johndeveloper", url: "#", color: "text-blue-600" },
      { icon: Twitter, label: "@johndev", url: "#", color: "text-sky-500" },
      { icon: Mail, label: "john@example.com", url: "#", color: "text-red-500" }
    ]
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-64 sm:h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=640" 
          alt="Professional workspace with coding setup" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      {/* Profile Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Avatar and Basic Info */}
        <div className="relative -mt-24 sm:-mt-32">
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
              alt="John Developer Profile Picture" 
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-xl object-cover"
            />
            
            {/* Name, Pronouns, Title, and Location - Gravatar Style */}
            <div className="text-center space-y-2">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">{profileData.name}</h1>
                <p className="text-base text-slate-500 mt-1">({profileData.pronouns})</p>
              </div>
              <p className="text-lg sm:text-xl text-slate-600">{profileData.title}</p>
              <p className="text-slate-500 flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1" />
                {profileData.location}
              </p>
            </div>
          </div>
          
          {/* Bio Section */}
          <Card className="mt-8 shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bio Text */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">About Me</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {profileData.bio}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {profileData.additionalBio}
                </p>
              </div>
              
              {/* Stats and Social Links */}
              <div className="space-y-6">
                {/* Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{profileData.stats.projects}</div>
                      <div className="text-sm text-slate-600">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">{profileData.stats.commits}</div>
                      <div className="text-sm text-slate-600">Commits</div>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Connect</h3>
                  <div className="space-y-2">
                    {profileData.socialLinks.map((link, index) => {
                      const IconComponent = link.icon;
                      return (
                        <a 
                          key={index}
                          href={link.url} 
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <IconComponent className={`text-xl ${link.color}`} />
                          <span className="text-slate-700">{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
