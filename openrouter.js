async function askAI(question) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer YOUR_OPENROUTER_API_KEY`,
            "Content-Type": "application/json",
            "HTTP-Referer": "YOUR_WEBSITE_URL", // Обязательно для OpenRouter
            "X-Title": "Геометрия ОГЭ"         // Название вашего приложения
        },
        body: JSON.stringify({
            "model": "openai/gpt-3.5-turbo", // Или другая модель (см. список ниже)
            "messages": [
                {
                    "role": "system",
                    "content": "Ты репетитор по геометрии. Давай подробные объяснения, но не раскрывай ответ сразу."
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}