import { useState } from 'react'
import axios from 'axios'
import './ContactForm.css'

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts[1].split(';')[0]
  }
  return null
}

export default function ContactForm() {
  const [status, setStatus] = useState(null) // 'success' | 'error' | 'loading' | null
  const [errorMsg, setErrorMsg] = useState('')
  const [llmResponse, setLlMResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')?.trim()
    const email = formData.get('email')?.trim()
    const phone = formData.get('phone')?.trim()
    const projectType = formData.get('projectType')?.trim()
    const message = formData.get('message')?.trim()

    // Простая валидация
    if (!name) {
      setErrorMsg('Пожалуйста, укажите ваше имя')
      return
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Введите корректный email')
      return
    }

    setErrorMsg('')
    setStatus('loading')

    const csrftoken = getCookie('csrftoken')

    try {
      // 1. Сохраняем лид в БД
      await axios.post('/api/leads/', {
        name,
        email,
        phone,
        project_type: projectType,
        message,
      }, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrftoken,
        },
      })

      // ВАРИАНТ А: сразу показать «Спасибо» (рекомендую для старта)
      setStatus('success')

      // ВАРИАНТ Б: если хочешь сразу получить черновик от LLM — раскомментируй блок ниже:
      /*
      const llmResponse = await axios.post('/api/llm/generate', {
        prompt: `Клиент: ${name} (${email}). Запрос: ${message}. Тип проекта: ${projectType}. Дай краткий черновик ответа: 2–3 предложения.`
      }, {
        withCredentials: true,
      })
      setLlMResponse(llmResponse.data.response)
      */
    } catch (err) {
      console.error(err)
      setErrorMsg('Не удалось отправить заявку. Попробуйте позже.')
      setStatus('error')
    } finally {
      if (status === 'loading') setStatus(null)
    }
  }

  return (
    <section className="contact-section">
      <div className="container">
        <h2>Оставьте заявку — предложу решение и оценку</h2>

        {status === 'success' && (
          <div id="thank-you-section" className="alert alert-success">
            <h3>Спасибо, заявка принята!</h3>
            <p>Мы изучим детали и свяжемся с вами в течение 24 часов.</p>
            {llmResponse && (
              <>
                <p><strong>Черновик ответа от LLM:</strong></p>
                <blockquote>{llmResponse}</blockquote>
              </>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="alert alert-error">{errorMsg}</div>
        )}

        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="contact-form">
            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="projectType"
                placeholder="Тип проекта (лендинг, CRM и т.п.)"
                className="form-input"
              />
            </div>
            <div className="form-row">
              <textarea
                name="message"
                placeholder="Расскажите про задачу"
                rows="4"
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
