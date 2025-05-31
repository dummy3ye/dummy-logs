import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Mail, MapPin, BadgeCheck } from "lucide-react";

export default function ProfileHeader() {
  const profileData = {
    name: "Dummy Sleeping",
    username: "@dummy3ye",
    pronouns: "he/hers",
    title: "hopeless romantic",
    location: " Asian, 5'10 btw",
    isVerified: true,
    profileImageUrl: "https://i.imgur.com/Nu0DWh2.jpeg", // Change this URL to your own image
    bio: "Teenage cat dad, deep into Stuff like breaking systems (on purpose), fixing them (mostly), staying up way too late at night learning things probably won’t really need after what imma be doing. I love cooking, messy desks, and figuring out the “why” behind everything. Not a nerd (yet), but definitely the kind of person who's 'jack of all trades'",
    additionalBio: "Historically unhinged, philosophically cooked. Crying over dead emperors, questioning if anything’s real. Every shi is a swamp of lore, chaos, and intrusive thoughts. No chill, just vibes, and maybe a lil obsession with love and ong finding fr meaning in a meaningless timeline.",
    stats: {
      projects: "11",
      commits: "1.2k"
    },
    socialLinks: [
      { icon: Github, label: "github.com/dummy3ye", url: "github.com/dummy3ye", color: "text-slate-700" },
      { icon: Linkedin, label: "linkedin.com/in/dummyhehe", url: "#", color: "text-blue-600" },
      { icon: Twitter, label: "@dummyalwayssleeps", url: "#", color: "text-sky-500" },
      { icon: Mail, label: "dummy#hellyeah.com", url: "#", color: "text-red-500" }
    ]
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 bg-cover bg-center bg-no-repeat">
        <img 
       src="https://i.imgur.com/Rxfdd5J.jpeg" 
          alt="Professional workspace with coding setup" 
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      {/* Profile Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Avatar and Basic Info */}
        <div className="relative -mt-16 sm:-mt-20">
          <div className="flex flex-col items-start space-y-4">
            {/* Avatar - No Border, Left Aligned */}
            <img 
              src={profileData.profileImageUrl}
              alt={`${profileData.name} Profile Picture`}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg object-cover"
            />
            
            {/* Name, Username, Pronouns, Title, and Location - Left Aligned Under Picture */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">{profileData.name}</h1>
                {profileData.isVerified && (
                  <img 
                    src="https://img.icons8.com/material/24/228BE6/instagram-verification-badge.png" 
                    alt="Verified Badge" 
                    className="w-6 h-6"
                  />
                )}
              </div>
              <p className="text-lg text-slate-600">{profileData.username}</p>
              <p className="text-base text-slate-500">({profileData.pronouns})</p>
              <p className="text-lg sm:text-xl text-slate-600">{profileData.title}</p>
              <p className="text-slate-500 flex items-center">
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
