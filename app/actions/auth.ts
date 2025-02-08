"use server"

// interface UserData is removed because fetchUserData is removed

// async function fetchUserData(email: string): Promise<UserData | null> is removed

export async function login(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  try {
    const response = await fetch("https://n8n-webhooks.bluenacional.com/webhook/nb1/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })

    if (response.ok) {
      const setCookieHeader = response.headers.get("Set-Cookie")
      if (setCookieHeader) {
        const tokenMatch = setCookieHeader.match(/authToken=([^;]+)/)
        if (tokenMatch) {
          const accessToken = tokenMatch[1]
          return { success: true, access_token: accessToken }
        }
      }
      return { success: false, error: "Failed to retrieve access token" }
    } else {
      const data = await response.json()
      return { success: false, error: data.msg || "User not found or incorrect password" }
    }
  } catch (error) {
    return { success: false, error: "An error occurred. Please try again later." }
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email")

  try {
    const response = await fetch("https://n8n-webhooks.bluenacional.com/webhook/nb1/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      return { success: true }
    } else {
      const data = await response.json()
      return { success: false, error: data.msg || "Failed to send reset instructions" }
    }
  } catch (error) {
    return { success: false, error: "An error occurred. Please try again later." }
  }
}

