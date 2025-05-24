import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Calendar, Users, BookOpen, ExternalLink } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  pushed_at: string;
}

export default function GitHubSection() {
  const username = "dummy3ye";
  
  // Featured repositories - you can customize these
  const featuredRepos = [
    "dummy3ye/ariwa",
    "dummy3ye/dummy-logs",
    "dummy3ye/react-components",
    "dummy3ye/node-api",
    "dummy3ye/python-scripts",
    "dummy3ye/web-portfolio"
  ];

  const { data: userStats, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ["github-user", username],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return response.json();
    }
  });

  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", username],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const allRepos = await response.json();
      
      // Filter to get only the featured repos in the specified order
      const filteredRepos = featuredRepos.map(repoName => 
        allRepos.find((repo: GitHubRepo) => repo.full_name === repoName)
      ).filter(Boolean).slice(0, 6); // Show only 6 repos
      
      return filteredRepos;
    }
  });

  if (userLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
            <Github className="mr-2 text-primary" />
            GitHub Profile
          </h2>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
          <Github className="mr-2 text-primary" />
          GitHub Profile
        </h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-blue-700 dark:hover:text-blue-400"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      {/* GitHub Stats */}
      {userStats && (
        <Card className="p-6 bg-white dark:bg-slate-800 border dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.public_repos}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Repositories
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{userStats.followers}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center">
                <Users className="w-4 h-4 mr-1" />
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.following}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center">
                <Users className="w-4 h-4 mr-1" />
                Following
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Date(userStats.created_at).getFullYear()}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Featured Repositories */}
      <div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">Featured Repositories</h3>
        {reposLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : repos && repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <Card key={repo.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-800 border dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{repo.name}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatTimeAgo(new Date(repo.pushed_at))}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{repo.full_name}</span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                    {repo.description || "No description available."}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{repo.forks_count}</span>
                      </div>
                    </div>
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                  </div>
                  
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  >
                    <span className="sr-only">View {repo.name} repository</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Github className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No repositories found</h3>
            <p className="text-slate-500 dark:text-slate-500">Unable to load repositories from GitHub.</p>
          </div>
        )}
      </div>
    </div>
  );
}