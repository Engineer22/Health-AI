
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fingerprint, User, ArrowLeft } from "lucide-react";

const Login = () => {
  const [accountType, setAccountType] = useState<"patient" | "provider" | "researcher">("patient");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign in to HealthAI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={accountType === "patient" ? "default" : "outline"}
                  onClick={() => setAccountType("patient")}
                  className="w-full"
                >
                  Patient
                </Button>
                <Button
                  variant={accountType === "provider" ? "default" : "outline"}
                  onClick={() => setAccountType("provider")}
                  className="w-full"
                >
                  Provider
                </Button>
                <Button
                  variant={accountType === "researcher" ? "default" : "outline"}
                  onClick={() => setAccountType("researcher")}
                  className="w-full"
                >
                  Researcher
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  <User className="h-4 w-4 mr-2" />
                  Sign in with Email
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Sign in with Biometrics
                </Button>
              </div>

              <div className="text-center text-sm">
                <a href="#" className="text-primary hover:text-primary/90">
                  Forgot your password?
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
