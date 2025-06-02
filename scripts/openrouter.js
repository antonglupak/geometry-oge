const OPENROUTER_API_KEY = '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'; // Получите на openrouter.ai

window.getAIHelp = function(inputId) {
    // Преобразуем строку в число и проверяем валидность
    const taskId = parseInt(inputId, 10);
    if (isNaN(taskId) || taskId < 1) {
        console.error('Некорректный ID задачи:', inputId);
        return;
    }
    console.log('Обработка задачи ID:', taskId);
    
    const helperDiv = document.getElementById(`hint${taskId}`);
    if (!helperDiv) {
        console.error('Блок подсказки не найден');
        return;
    }
    const taskElement = document.getElementById(`task${taskId}`);
    if (!taskElement) {
        console.error(`Element #task${taskId} not found`);
        return;
    }
    const textElement = taskElement.querySelector('.task-text');
    if (!textElement) {
        console.error(`.task-text not found in task ${taskId}`);
        return;
    }
    const taskText = textElement.textContent;
    
    // Создаем JSONP-элемент
    const script = document.createElement('script');
    const apiUrl = `https://api.openrouter.ai/api/v1/chat/completions`;
    const params = new URLSearchParams({
        callback: 'handleResponse',
        messages: JSON.stringify([{
            role: 'user',
            content: `Объясни решение задачи по геометрии: ${taskText}. Давай подсказки по шагам, но не называй ответ прямо.`
        }]),
        model: 'google/palm-2',
        key: OPENROUTER_API_KEY
    });
    script.src = `https://cors.bridged.cc/${apiUrl}?${params}`;
    
    // Обработчик ответа
    window.handleResponse = function(data, taskId) {
        helperDiv.innerHTML = `<div class="ai-response">${data.choices[0].message.content}</div>`;
        script.remove();
    };
    
    // Обработчик ошибок
    script.onerror = () => {
        helperDiv.innerHTML = '<div class="error">Ошибка соединения</div>';
        script.remove();
    };
    
    document.body.appendChild(script);
    helperDiv.innerHTML = '<div class="loading">Загрузка...</div>';
}