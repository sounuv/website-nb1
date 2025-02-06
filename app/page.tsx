import LoginForm from "./components/login-form"
import { SparklesCore } from "@/components/SparklesCore"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#3538CD"
        />
      </div>
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  )
}

