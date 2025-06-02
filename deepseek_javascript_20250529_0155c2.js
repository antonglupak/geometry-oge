async function showHint(taskId) {
    const taskText = document.querySelector(`#task-${taskId} p`).textContent;
    const aiResponseElement = document.getElementById(`ai-hint-${taskId}`);

    aiResponseElement.innerHTML = `<span class="ai-typing"></span>`;

    const prompt = `Дана задача: "${taskText}". Дай подсказку для решения, но не давай ответ. 
                   Начни с анализа условия и укажи, какие теоремы применить.`;

    const hint = await askAI(prompt);
    aiResponseElement.innerHTML = hint;
}