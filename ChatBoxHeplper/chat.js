document.addEventListener("DOMContentLoaded", (e) => {
  var dom = {
    frame: window.parent.document.getElementById("widget-frame"),
    widgetForm: document.getElementById("widget-chatbox"),
    widgetContent: document.querySelector(".widget-content"),
    widgetIcon: document.querySelector(".widget-icon"),
    widgetDefaultOpen: document.querySelector(".widget-default"),
    widgetDefaultClose: document.querySelector(".widget-close"),
    widgetIconClose: document.querySelector(".widget-icon-close"),
    widgetContainer: document.querySelector(".widget-container"),
    widgetMenu: document.querySelector(".chatbox"),
    sendBtn: document.getElementById("send-btn"),
    chatInput: document.querySelector(".chat-input textarea"),
    chatbox: document.querySelector(".chatbox"),
  };

  const setWidgetFormSize = function (state) {
    if (dom.frame) {
      if (state === 1) {
        dom.widgetForm.style.width = "75px";
        dom.widgetForm.style.height = "75px";
      } else {
        dom.frame.style.width = "360px";
        dom.frame.style.height = "480px";
        dom.widgetContent.style.height = "300px";
      }
    }
  };
  setWidgetFormSize(1);
  const createChatLiTag = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent =
      className === "outgoing"
        ? `<p></p>`
        : `<span><i class="fa-solid fa-robot"></i></span>
        <p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };
  const generateResponse = (incomingChatLi) => {
    const API_URL = "http://localhost:5500/conversation/01e2fc5c-2c89-4ec7-8470-7688608b496c/5bee7fcb-ac40-45bc-9375-accdea2fe452";
    const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjYWUyZDk1Ni1jYTI2LTRjNGQtYWE5Yi1kZDNjMTljZjNjM2QiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsIjoiZGFuZ3F1eWV0MjAyQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiLEkMSDbmciLCJmYW1pbHlfbmFtZSI6IlF1eeG6v3QiLCJzb3VyY2UiOiJpbnRlcm5hbCIsImV4dGVybmFsX2lkIjoiIiwianRpIjoiOGRlMmFlOTYtMWM3Ny00MDUwLWFkZjktZTI0MDA1MWU0MTRhIiwibmJmIjoxNzE2Mjc2ODA0LCJleHAiOjE3MTYyODQwMDQsImlhdCI6MTcxNjI3NjgwNCwiaXNzIjoiYm90c2hhcnAiLCJhdWQiOiJib3RzaGFycCJ9.lTbINTurtksQDNNsGdTfKpNzJqZICs_1CSEi8VQRimE";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        "model": "llama-2-7b-chat.Q3_K_S.gguf",
        "temperature": 0,
        "samplingFactor": 0,
        "states": [
          
        ],
        "text": userMessage,
        "channel": "openapi"
      }),
    };
    fetch(API_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        messageElement.textContent = data.text;
      })
      .catch((err) => {
        messageElement.textContent =
          "Oops! Something went wrong. Please try again";
      })
      .finally(() => {
        dom.chatbox.scrollTo(0, dom.chatbox.scrollHeight);
      });
  };
  const handleChat = () => {
    userMessage = dom.chatInput.value.trim();
    if (!userMessage) return;
    dom.chatInput.value = "";
    dom.chatbox.appendChild(createChatLiTag(userMessage, "outgoing"));
    dom.chatbox.scrollTo(0, dom.chatbox.scrollHeight);
    setTimeout(() => {
      const incomingChatLi = createChatLiTag("...", "incoming");
      dom.chatbox.appendChild(incomingChatLi);
      dom.chatbox.scrollTo(0, dom.chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  };
  // show popup
  dom.widgetDefaultOpen.addEventListener("click", () => {
    dom.widgetContent.classList.add("active");
    dom.widgetDefaultOpen.classList.add("hidden");
    dom.widgetDefaultClose.classList.add("active");
    dom.widgetIcon.classList.remove("effect-close");
    dom.widgetIcon.classList.add("effect-open");
    if (dom.frame) {
      dom.frame.style.width = "360px";
      dom.frame.style.height = "480px";
      dom.widgetContent.style.height = "300px";
    }
  });

  // hide popup
  dom.widgetDefaultClose.addEventListener("click", () => {
    dom.widgetContent.classList.remove("active");
    dom.widgetDefaultOpen.classList.remove("hidden");
    dom.widgetDefaultClose.classList.remove("active");
    dom.widgetIcon.classList.remove("effect-open");
    dom.widgetIcon.classList.add("effect-close");
    if (dom.frame) {
      dom.frame.style.width = "75px";
      dom.frame.style.height = "75px";
      dom.widgetContent.style.height = "75px";
    }
  });

  // hide popup when click close-icon in popup
  dom.widgetIconClose.addEventListener("click", () => {
    dom.widgetContent.classList.remove("active");
    dom.widgetDefaultOpen.classList.remove("hidden");
    dom.widgetDefaultClose.classList.remove("active");
    dom.widgetIcon.classList.remove("effect-open");
    dom.widgetIcon.classList.add("effect-close");
    if (dom.frame) {
      dom.frame.style.width = "75px";
      dom.frame.style.height = "75px";
      dom.widgetContent.style.height = "75px";
    }
  });

  //
  dom.sendBtn.addEventListener("click", handleChat);
});
