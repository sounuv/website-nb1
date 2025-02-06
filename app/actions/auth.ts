"use server"

// interface UserData is removed because fetchUserData is removed

// async function fetchUserData(email: string): Promise<UserData | null> is removed

export async function login(formData: FormData) {
  const username = formData.get("username")
  const password = formData.get("password")

  try {
    const response = await fetch("https://n8n-webhooks.bluenacional.com/webhook/37653958-a7cf-4daf-9d54-9696feb72ae8", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, access_token: data.access_token }
    } else {
      return { success: false, error: "User not found or incorrect password" }
    }
  } catch (error) {
    return { success: false, error: "An error occurred. Please try again later." }
  }
}

