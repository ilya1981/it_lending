import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import ServicesAndAdvantages from './components/ServicesAndAdvantages'


function App() {
  return (
    <>
      <Hero />
      <ServicesAndAdvantages />
      {/* Вот этот id обязателен для работы скролла */}
      <section id="contact" style={{ marginTop: '64px' }}></section>
      <ContactForm />
    </>
  )
}

export default App

