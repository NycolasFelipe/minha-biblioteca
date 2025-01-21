/**
 * Permite arrastar um elemento HTML.
 *
 * @param {HTMLElement} element O elemento HTML que será arrastado.
 * @param {HTMLElement} dragElement O elemento HTML sensível a ser arrastado.
 * @returns {void}
 */
function dragElement(element, dragElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // Anexa o evento 'mousedown' ao elemento 'dragElement'
  dragElement.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Compatibilidade entre navegadores
    e = e || window.event;

    // Previne ações padrão do evento de clique
    e.preventDefault();

    // Captura a posição inicial do cursor do mouse
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Anexa os eventos 'mouseup' e 'mousemove' ao documento
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // Compatibilidade entre navegadores
    e = e || window.event;

    // Previne ações padrão do evento de movimento do mouse
    e.preventDefault();

    // Calcula a nova posição do cursor do mouse
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Atualiza a posição do elemento arrastável
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Remove os eventos 'mouseup' e 'mousemove' ao soltar o mouse
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default dragElement;