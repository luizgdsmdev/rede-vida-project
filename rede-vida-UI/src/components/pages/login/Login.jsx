import LoginForm from "./loginForm/LoginForm"
import VisualImageSection from "./visualImageSection/VisualImageSection"

function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen overflow-hidden max-h-[90dvh]">
      <LoginForm />
      <VisualImageSection />
    </section>
  )
}

export default Login