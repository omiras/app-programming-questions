document.querySelector('#load-question').addEventListener('click', async () => {
    // Obtener la categoría seleccionada
    const category = document.querySelector('#category-select').value;
  
    // Limpiar el contenido actual
    document.querySelector('#question-text').textContent = 'Cargando...';
    document.querySelector('#code-example').textContent = '';
    document.querySelector('#answer-0').textContent = '';
    document.querySelector('#answer-1').textContent = '';
    document.querySelector('#answer-2').textContent = '';
    document.querySelector('#answer-3').textContent = '';
    document.querySelector('#correct-answer').textContent = '...';
  
    // Construir la URL con la categoría seleccionada
    const url = `https://codequestapi.onrender.com/api/v1/questions/random?amount=1&categories=${category}`;
  
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      const pregunta = datos.results[0];
  
      // Rellenar la pregunta y respuestas
      document.querySelector('#question-text').textContent = pregunta.question;
  
      if (pregunta.codeExamples.length > 0) {
        document.querySelector('#code-example').textContent = pregunta.codeExamples[0];
      }

      document.getElementById('question-category').textContent = pregunta.categories.join(",");

  
      document.querySelector('#answer-0').textContent = pregunta.answerOptions[0].answer;
      document.querySelector('#answer-1').textContent = pregunta.answerOptions[1].answer;
      document.querySelector('#answer-2').textContent = pregunta.answerOptions[2].answer;
      document.querySelector('#answer-3').textContent = pregunta.answerOptions[3].answer;
  
      if (pregunta.answerOptions[0].isCorrect) {
        document.querySelector('#correct-answer').textContent = pregunta.answerOptions[0].answer;
      } else if (pregunta.answerOptions[1].isCorrect) {
        document.querySelector('#correct-answer').textContent = pregunta.answerOptions[1].answer;
      } else if (pregunta.answerOptions[2].isCorrect) {
        document.querySelector('#correct-answer').textContent = pregunta.answerOptions[2].answer;
      } else if (pregunta.answerOptions[3].isCorrect) {
        document.querySelector('#correct-answer').textContent = pregunta.answerOptions[3].answer;
      }
    } catch (error) {
      document.querySelector('#question-text').textContent = 'Error al cargar la pregunta. Intenta de nuevo.';
    }
  });
  