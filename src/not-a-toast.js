import "./not-a-toast.css";

(function injectLiquidGlassSVG() {
  if (document.getElementById("glass-distortion")) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("style", "position:absolute; width:0; height:0");

  svg.innerHTML = `
    <filter id="glass-distortion">
      <feTurbulence type="fractalNoise" baseFrequency="0.002 0.002" numOctaves="1" seed="5" result="turbulence"/>
      <feGaussianBlur in="turbulence" stdDeviation="0.1" result="softMap"/>
      <feDisplacementMap in="SourceGraphic" in2="softMap" scale="100"/>
    </filter>
  `;

  document.body.appendChild(svg);
})();

function toast(options = {}, config) {
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  function generateUniqueId() {
    return `toast-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
  const id = generateUniqueId();

  const {
    message = "Hello from not-a-toast!",
    duration = 3000,
    position = "top-center",
    orderReversed = false,
    entryAnimation = "fadeIn",
    exitAnimation = "fadeOut",
    theme = "default",
    autoClose = true,
    pauseOnHover = true,
    showProgressBar = true,
    progressBarColor,
    progressBarHeight = "0.2rem",
    progressBarPosition = "bottom",
    background,
    color,
    border,
    borderRadius = "0.3rem",
    fontSize,
    fontFamily,
    opacity,
    showCloseButton = true,
    closeButtonColor,
    closeButtonSize = "1rem",
    showActionButton = false,
    actionButtontheme = theme,
    actionButtonLabel,
    onAction,
    actionButtonColor,
    actionButtonBackground,
    actionButtonPadding = "0.4rem",
    actionButtonMargin = "0rem 0rem 0rem 0.8rem",
    actionButtonBorder,
    actionButtonBorderRadius = "0.3rem",
    actionButtonFontSize,
    actionButtonFontFamily,
    actionButtonOpacity,
    actionButtonShadow,
    iconType,
    icon,
    iconBackground,
    iconColor,
    iconBorderRadius = "50%",
    iconAnimation = "iconPulse",
    iconTimingFunction = "ease",
    customToast,
  } = options;
  let container = document.querySelector(`.toast-container.${position}`);
  if (!container) {
    container = document.createElement("div");
    container.classList.add("toast-container", position);
    container.style.position = "fixed";
    container.style.display = "flex";
    container.style.gap = "0.8rem";
    container.style.zIndex = "1000";
    container.style.pointerEvents = "none";
    container.style.width = "100%";

    const positions = {
      "top-left": () => {
        container.style.top = "1rem";
        container.style.left = "1rem";
        container.style.alignItems = "flex-start";
      },
      "top-center": () => {
        container.style.top = "1rem";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.alignItems = "center";
      },
      "top-right": () => {
        container.style.top = "1rem";
        container.style.right = "1rem";
        container.style.alignItems = "flex-end";
      },
      "bottom-left": () => {
        container.style.bottom = "1rem";
        container.style.left = "1rem";
        container.style.alignItems = "flex-start";
      },
      "bottom-center": () => {
        container.style.bottom = "1rem";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.alignItems = "center";
      },
      "bottom-right": () => {
        container.style.bottom = "1rem";
        container.style.right = "1rem";
        container.style.alignItems = "flex-end";
      },
    };

    positions[position]?.();
    document.body.appendChild(container);
  }

  if (position.startsWith("bottom"))
    container.style.flexDirection = orderReversed ? "column-reverse" : "column";
  else
    container.style.flexDirection = orderReversed ? "column" : "column-reverse";

  const toast = document.createElement("div");
  toast.id = id;
  toast._config = { ...options };
  if (!customToast) {
    toast.className = `${theme}`;
    toast.style.padding = "0.85rem 1rem";
    toast.style.position = "relative";
    toast.style.display = "flex";
    toast.style.justifyContent = "space-between";
    toast.style.alignItems = "center";
    if (border) toast.style.border = border;
    if (opacity) toast.style.opacity = opacity;
    if (borderRadius) toast.style.borderRadius = borderRadius;
    if (background) toast.style.background = background;
    if (color) toast.style.color = color;
    if (fontSize) toast.style.fontSize = fontSize;
    if (fontFamily) toast.style.fontFamily = fontFamily;
    if (window.innerWidth <= 450) {
      toast.style.maxWidth = "80%";
    }
  }
  if (customToast) toast.innerHTML = customToast;
  toast.style.pointerEvents = "auto";
  toast.style.animation = `${entryAnimation} 0.4s ease`;

  const tempTheme = document.createElement("div");
  tempTheme.className = `${theme}`;
  tempTheme.style.display = "none";
  document.body.appendChild(tempTheme);

  if (!customToast) {
    const progressBar = document.createElement("div");
    progressBar.className = "progress";
    progressBar.style.height = progressBarHeight;
    progressBar.style.width = "100%";
    progressBar.style.position = "absolute";
    if (progressBarPosition == "top") progressBar.style.top = 0;
    else progressBar.style.bottom = 0;
    progressBar.style.left = 0;
    if (progressBarColor) progressBar.style.background = progressBarColor;
    else if (color) progressBar.style.background = color;
    else progressBar.style.background = getComputedStyle(tempTheme).color;
    progressBar.style.animation = `progress ${
      duration / 1000
    }s linear forwards`;

    if (pauseOnHover) {
      toast.addEventListener("mouseenter", () => {
        progressBar.style.animationPlayState = "paused";
      });

      toast.addEventListener("mouseleave", () => {
        progressBar.style.animationPlayState = "running";
      });
    }
    if (showProgressBar && autoClose) {
      toast.appendChild(progressBar);
    }
  }

  if (!customToast) {
    let opac = getComputedStyle(tempTheme).backgroundColor.match(
      /rgba?\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/
    );

    if (iconType || icon) {
      const Icon = document.createElement("div");
      Icon.className = "icon";
      if (
        (iconType == "success" ||
          iconType == "error" ||
          iconType == "warn" ||
          iconType == "loader" ||
          iconType == "info") &&
        !icon
      ) {
        if (getComputedStyle(tempTheme).backgroundColor == "rgba(0, 0, 0, 0)") {
          Icon.style.color = "white";
          if (getComputedStyle(tempTheme).color == "rgb(255, 255, 255)")
            Icon.style.color = "black";
        } else {
          Icon.style.color = getComputedStyle(tempTheme).backgroundColor;
        }

        if (opac) {
          if (parseFloat(opac[1]) <= 0.3) {
            Icon.style.color = "white";
            if (getComputedStyle(tempTheme).color == "rgb(255, 255, 255)") {
              Icon.style.color = "black";
            }
          }
        }
        Icon.style.background = getComputedStyle(tempTheme).color;
        if (background) Icon.style.color = background;
        if (color) Icon.style.background = color;
        if (iconType == "loader") {
          Icon.style.border = `3px solid rgba(255, 255, 255, 0.2)`;
          Icon.style.borderTop = "3px solid white";
          Icon.style.borderRadius = "50%";
          Icon.style.width = "1.2rem";
          Icon.style.height = "1.2rem";
          Icon.style.background = "transparent";
          Icon.style.borderTop = `3px solid ${
            getComputedStyle(tempTheme).color
          }`;
          if (color) Icon.style.borderTop = `3px solid ${color}`;
          if (iconColor) Icon.style.borderTop = `3px solid ${iconColor}`;
          Icon.style.animation = "spin 0.4s infinite";
        }
        if (iconType == "success") Icon.innerHTML = "&#10004";
        if (iconType == "error") Icon.innerHTML = "&#x2718";
        if (iconType == "info")
          Icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6ZM9 10H11V18H9V20H15V18H13V8H9V10Z"></path></svg>`;
        if (iconType == "warn")
          Icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>`;
      }

      if (icon) Icon.innerHTML = icon;
      if (iconBackground) Icon.style.background = iconBackground;
      if (iconColor) Icon.style.color = iconColor;
      Icon.style.fontSize = "1.2rem";
      Icon.style.height = "1.3rem";
      Icon.style.width = "1.3rem";
      Icon.style.display = "flex";
      Icon.style.alignItems = "center";
      Icon.style.justifyContent = "center";
      Icon.style.borderRadius = iconBorderRadius;
      Icon.style.marginRight = "0.5rem";
      if (!(iconType == "loader"))
        Icon.style.animation = `${iconAnimation} 0.6s ${iconTimingFunction}`;
      toast.appendChild(Icon);
    }
    const toastMessage = document.createElement("div");
    toastMessage.className = "message";
    toastMessage.innerHTML = `${message.replace(/\n/g, "<br>")}`;
    toastMessage.style.flex = "1";
    toastMessage.style.maxWidth = "19rem";
    toastMessage.style.overflow = "hidden";
    toast.appendChild(toastMessage);
  }

  let timeout;
  let startTime = Date.now();
  let remaining = duration;
  let pauseTime;

  const controller = {
    close: () => {
      if (autoClose) {
        toastExit("manual");
      }
    },
    update: (newConfig) => updateToast(id, newConfig),
    promise,
  };
  toast._controller = controller;

  if (!customToast) {
    if (showActionButton && actionButtonLabel) {
      const actionBtn = document.createElement("div");
      actionBtn.className = `actionBtn ${actionButtontheme}`;
      actionBtn.textContent = actionButtonLabel;
      actionBtn.style.cursor = "pointer";
      actionBtn.style.padding = actionButtonPadding;
      actionBtn.style.borderRadius = actionButtonBorderRadius;
      actionBtn.style.margin = actionButtonMargin;
      actionBtn.style.overflow = "hidden";
      let borStr = getComputedStyle(tempTheme).border;
      if (
        borStr[0] + borStr[1] + borStr[2] == "0px" ||
        !getComputedStyle(tempTheme).border
      )
        actionBtn.style.border = `1px solid ${
          getComputedStyle(tempTheme).color
        }`;
      else actionBtn.style.border = getComputedStyle(tempTheme).border;
      if (color) actionBtn.style.border = `1px solid ${color}`;
      if (actionButtonBackground)
        actionBtn.style.background = actionButtonBackground;
      else if (background) actionBtn.style.background = background;
      if (actionButtonColor) actionBtn.style.color = actionButtonColor;
      else if (color) actionBtn.style.color = color;
      if (actionButtonFontFamily)
        actionBtn.style.fontFamily = actionButtonFontFamily;
      if (actionButtonFontSize) actionBtn.style.fontSize = actionButtonFontSize;
      if (actionButtonBorder) actionBtn.style.border = actionButtonBorder;
      if (actionButtonOpacity) actionBtn.style.opacity = actionButtonOpacity;
      if (actionButtonShadow) actionBtn.style.shadow = actionButtonShadow;
      toast.appendChild(actionBtn);
      actionBtn.addEventListener("click", () => {
        if (typeof onAction === "function") {
          onAction(controller);
        }
      });
    }

    if (showCloseButton) {
      const closeBtn = document.createElement("div");
      closeBtn.className = "clsBtn";
      closeBtn.innerHTML = "&#10005";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.marginLeft = "0.9rem";
      closeBtn.style.fontWeight = 900;
      closeBtn.style.fontSize = closeButtonSize;
      if (closeButtonColor) closeBtn.style.color = closeButtonColor;
      toast.appendChild(closeBtn);
      closeBtn.addEventListener("click", () => {
        clearTimeout(timeout);
        toastExit("cancel");
      });
    }
  }

  container.appendChild(toast);

  if (duration > 0) {
    timeout = setTimeout(() => {
      if (autoClose) {
        toastExit("timeout");
      }
    }, duration);
  }

  if (pauseOnHover && autoClose) {
    toast.addEventListener("mouseenter", () => {
      if (timeout) {
        clearTimeout(timeout);
        pauseTime = Date.now();
        remaining -= pauseTime - startTime;
      }
    });

    toast.addEventListener("mouseleave", () => {
      if (duration > 0) {
        startTime = Date.now();
        timeout = setTimeout(() => {
          if (autoClose) {
            toastExit("timeout");
          }
        }, remaining);
      }
    });
  }
  function toastExit(action) {
    toast.style.animation = `${exitAnimation} 0.4s ease`;
    toast.addEventListener(
      "animationend",
      () => {
        toast.remove();
        if (container.childElementCount === 0) container.remove();
        resolvePromise({ action });
      },
      { once: true }
    );
  }

  return controller;
}

function updateToast(id, newConfig = {}) {
  const toast = document.getElementById(id);
  if (!toast) return;
  const originalConfig = toast._config || {};
  let {
    progressBarPosition = "bottom",
    autoClose = true,
    showProgressBar,
    showActionButton,
    progressBarHeight = "0.2rem",
    actionButtonPadding = "0.4rem",
    actionButtonMargin = "0rem 0rem 0rem 0.8rem",
    actionButtonBorderRadius = "0.3rem",
    actionButtontheme = newConfig.theme || originalConfig.theme || "default",
    actionButtonLabel = originalConfig.actionButtonLabel,
    showCloseButton,
    pauseOnHover,
  } = newConfig;

  let showProgressBarTemp;
  if (originalConfig.showProgressBar == false) {
    showProgressBarTemp = false;
  } else showProgressBarTemp = true;
  if (showProgressBar == true) {
    showProgressBarTemp = true;
  } else if (showProgressBar == false) showProgressBarTemp = false;
  showProgressBar = showProgressBarTemp;

  let showActionButtonTemp;
  if (originalConfig.showActionButton == false) {
    showActionButtonTemp = false;
  } else if (originalConfig.showActionButton == true)
    showActionButtonTemp = true;
  if (showActionButton == true) {
    showActionButtonTemp = true;
  } else if (showActionButton == false) showActionButtonTemp = false;
  showActionButton = showActionButtonTemp;

  let showCloseButtonTemp;
  if (originalConfig.showCloseButton == false) {
    showCloseButtonTemp = false;
  } else showCloseButtonTemp = true;
  if (showCloseButton == true) {
    showCloseButtonTemp = true;
  } else if (showCloseButton == false) showCloseButtonTemp = false;
  showCloseButton = showCloseButtonTemp;

  let pauseOnHoverTemp;
  if (originalConfig.pauseOnHover == false) {
    pauseOnHoverTemp = false;
  } else pauseOnHoverTemp = true;
  if (pauseOnHover == true) {
    pauseOnHoverTemp = true;
  } else if (pauseOnHover == false) pauseOnHoverTemp = false;
  pauseOnHover = pauseOnHoverTemp;

  const mergedConfig = { ...originalConfig, ...newConfig };
  let { duration = 3000 } = mergedConfig;
  toast._config = mergedConfig;
  if (duration > 0) {
    toast._timeout = setTimeout(() => {
      if (autoClose) {
        toast.remove();
      }
    }, duration);
  }

  if (pauseOnHover && autoClose) {
    if (!toast._hoverListenerAdded) {
      toast._hoverListenerAdded = true;

      toast.addEventListener("mouseenter", () => {
        if (toast._timeout) {
          clearTimeout(toast._timeout);
          const elapsed = Date.now() - (toast._startTime || Date.now());
          toast._remaining = Math.max(
            (toast._remaining || duration) - elapsed,
            0
          );
          toast._pauseTime = Date.now();
        }
      });

      toast.addEventListener("mouseleave", () => {
        if (toast._remaining > 0) {
          toast._startTime = Date.now();
          toast._timeout = setTimeout(() => {
            toast.remove();
          }, toast._remaining);
        } else {
          toast.remove();
        }
      });
    }

    if (toast.matches(":hover")) {
      clearTimeout(toast._timeout);
      toast._pauseTime = Date.now();
      toast._remaining = newConfig.duration;
    }
  }

  if (newConfig.customToast) {
    toast.className = "";
    toast.innerHTML = newConfig.customToast;

    const closeBtn = toast.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        toast.style.animation = `${
          newConfig.exitAnimation || "fadeOut"
        } 0.4s ease`;

        toast.addEventListener(
          "animationend",
          () => {
            toast.remove();
            const container = toast.parentElement;
            if (container && container.childElementCount === 0) {
              container.remove();
            }
          },
          { once: true }
        );
      });
    }

    if (newConfig.autoClose !== false && newConfig.duration !== undefined) {
      clearTimeout(toast._timeout);
      toast._timeout = setTimeout(() => {
        toast.style.animation = `${
          newConfig.exitAnimation || "fadeOut"
        } 0.4s ease`;
        toast.addEventListener(
          "animationend",
          () => {
            toast.remove();
            const container = toast.parentElement;
            if (container && container.childElementCount === 0) {
              container.remove();
            }
          },
          { once: true }
        );
      }, newConfig.duration);
    }
    return;
  }
  if (newConfig.theme) toast.className = newConfig.theme;
  if (newConfig.border) toast.style.border = newConfig.border;
  if (newConfig.opacity) toast.style.opacity = newConfig.opacity;
  if (newConfig.borderRadius) toast.style.borderRadius = newConfig.borderRadius;
  if (newConfig.background) toast.style.background = newConfig.background;
  if (newConfig.color) toast.style.color = newConfig.color;
  if (newConfig.fontSize) toast.style.fontSize = newConfig.fontSize;
  if (newConfig.fontFamily) toast.style.fontFamily = newConfig.fontFamily;

  const tempTheme = document.createElement("div");
  tempTheme.className = toast.className;
  document.body.appendChild(tempTheme);

  if (
    showProgressBar == false &&
    (originalConfig.showProgressBar ||
      originalConfig.showProgressBar == undefined)
  )
    toast.querySelector(".progress").remove();
  if (showProgressBar && (originalConfig.autoClose || autoClose)) {
    let progressBar;
    if (originalConfig.showProgressBar == false && showProgressBar == true) {
      progressBar = document.createElement("div");
      progressBar.style.width = "100%";
      progressBar.style.position = "absolute";
      progressBar.style.left = 0;
      progressBar.style.borderRadius = "0.3rem";
    } else {
      progressBar = toast.querySelector(".progress");
    }
    let progressBarHeightTemp = "0.2rem";
    if (
      typeof progressBarHeight === "string" &&
      progressBarHeight.trim() !== ""
    ) {
      progressBar.style.height = progressBarHeight;
    } else if (
      typeof originalConfig.progressBarHeight === "string" &&
      originalConfig.progressBarHeight.trim() !== ""
    ) {
      progressBar.style.height = originalConfig.progressBarHeight;
    } else progressBar.style.height = progressBarHeightTemp;
    if (progressBarPosition == "top") progressBar.style.top = 0;
    else if (progressBarPosition == "bottom") progressBar.style.bottom = 0;
    else if (originalConfig.progressBarPosition == "top")
      progressBar.style.top = 0;
    else progressBar.style.bottom = 0;
    if (newConfig.progressBarColor)
      progressBar.style.background = newConfig.progressBarColor;
    else if (originalConfig.progressBarColor)
      progressBar.style.background = originalConfig.progressBarColor;
    else if (newConfig.color) progressBar.style.background = newConfig.color;
    else progressBar.style.background = getComputedStyle(tempTheme).color;
    progressBar.style.animation = `progress ${
      duration / 1000
    }s linear forwards`;

    if (pauseOnHover) {
      toast.addEventListener("mouseenter", () => {
        progressBar.style.animationPlayState = "paused";
      });

      toast.addEventListener("mouseleave", () => {
        progressBar.style.animationPlayState = "running";
      });
    }
    toast.appendChild(progressBar);
  }
  if (
    showActionButton == false &&
    (originalConfig.showActionButton ||
      originalConfig.showActionButton == undefined)
  ) {
    toast.querySelector(".progress").remove();
  }
  if (showActionButton && actionButtonLabel) {
    let actionBtn;
    if (!originalConfig.showActionButton) {
      actionBtn = document.createElement("div");
      actionBtn.style.cursor = "pointer";
      actionBtn.style.padding = actionButtonPadding;
      actionBtn.style.borderRadius = actionButtonBorderRadius;
      actionBtn.style.margin = actionButtonMargin;
      actionBtn.style.overflow = "hidden";
    } else actionBtn = toast.querySelector(".actionBtn");
    actionBtn.className += ` ${actionButtontheme}`;
    actionBtn.textContent = actionButtonLabel;
    let borStr = getComputedStyle(tempTheme).border;
    if (
      borStr[0] + borStr[1] + borStr[2] == "0px" ||
      !getComputedStyle(tempTheme).border
    )
      actionBtn.style.border = `1px solid ${getComputedStyle(tempTheme).color}`;
    else actionBtn.style.border = getComputedStyle(tempTheme).border;
    if (newConfig.color) actionBtn.style.border = `1px solid ${color}`;
    if (newConfig.actionButtonBackground)
      actionBtn.style.background = newConfig.actionButtonBackground;
    else if (newConfig.background)
      actionBtn.style.background = newConfig.background;
    if (newConfig.actionButtonColor)
      actionBtn.style.color = newConfig.actionButtonColor;
    else if (newConfig.color) actionBtn.style.color = newConfig.color;
    if (newConfig.actionButtonFontFamily)
      actionBtn.style.fontFamily = newConfig.actionButtonFontFamily;
    if (newConfig.actionButtonFontSize)
      actionBtn.style.fontSize = newConfig.actionButtonFontSize;
    if (newConfig.actionButtonBorder)
      actionBtn.style.border = newConfig.actionButtonBorder;
    if (newConfig.actionButtonOpacity)
      actionBtn.style.opacity = newConfig.actionButtonOpacity;
    if (newConfig.actionButtonShadow)
      actionBtn.style.shadow = newConfig.actionButtonShadow;
    toast.appendChild(actionBtn);
    const controller = toast._controller; // <-- use the original controller
    actionBtn.addEventListener("click", () => {
      if (typeof newConfig.onAction === "function") {
        newConfig.onAction(controller); // ← now x.close() works!
      }
    });
  }
  if (
    originalConfig.showCloseButton ||
    originalConfig.showCloseButton == undefined
  )
    toast.querySelector(".clsBtn").remove();
  if (showCloseButton) {
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = "&#10005";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.marginLeft = "0.9rem";
    closeBtn.style.fontWeight = 900;
    closeBtn.style.fontSize =
      newConfig.closeButtonSize || originalConfig.closeButtonSize || "1rem";
    closeBtn.style.color =
      newConfig.closeButtonColor || originalConfig.closeButtonColor;
    toast.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
      toast.remove();
    });
  }
  if (
    newConfig.iconType ||
    newConfig.icon ||
    originalConfig.iconType ||
    originalConfig.icon
  ) {
    let iconElement = toast.querySelector(".icon");
    if (!iconElement) return;
    const iconType = newConfig.iconType || originalConfig.iconType;
    const icon = newConfig.icon || originalConfig.icon;
    const background = newConfig.background || originalConfig.background;
    const color = newConfig.color || originalConfig.color;
    const iconColor = newConfig.iconColor || originalConfig.iconColor;
    const iconBackground =
      newConfig.iconBackground || originalConfig.iconBackground;
    const iconBorderRadius =
      newConfig.iconBorderRadius || originalConfig.iconBorderRadius || "50%";
    const iconAnimation =
      newConfig.iconAnimation || originalConfig.iconAnimation || "iconPulse";
    const iconTimingFunction =
      newConfig.iconTimingFunction ||
      originalConfig.iconTimingFunction ||
      "ease";

    iconElement.className = "";
    iconElement.innerHTML = "";
    iconElement.style.borderTop = "";
    iconElement.style.animation = "";

    let fg = getComputedStyle(tempTheme).color;
    let bg = getComputedStyle(tempTheme).backgroundColor;
    if ((iconType || originalConfig.iconType) && !icon) {
      iconElement.style.background = color || getComputedStyle(tempTheme).color;
      iconElement.style.color =
        newConfig.background || getComputedStyle(tempTheme).backgroundColor;
      let opac = bg.match(/rgba?\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/);
      if (bg === "rgba(0, 0, 0, 0)" || (opac && parseFloat(opac[1]) <= 0.3)) {
        iconElement.style.color = "white";
        if (fg === "rgb(255, 255, 255)") {
          iconElement.style.color = "black";
        }
      }

      if (iconType === "loader") {
        iconElement.style.border = `3px solid rgba(255, 255, 255, 0.2)`;
        iconElement.style.borderTop = "3px solid white";
        iconElement.style.borderRadius = "50%";
        iconElement.style.width = "1.2rem";
        iconElement.style.height = "1.2rem";
        iconElement.style.background = "transparent";
        iconElement.style.borderTop = `3px solid ${iconColor || color || fg}`;
        iconElement.style.animation = "spin 0.4s infinite";
      }

      if (iconType === "success") iconElement.innerHTML = "&#10004";
      if (iconType === "error") iconElement.innerHTML = "&#x2718";
      if (iconType === "info")
        iconElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6ZM9 10H11V18H9V20H15V18H13V8H9V10Z"></path></svg>`;
      if (iconType === "warn")
        iconElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.522 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg>`;
    }

    if (icon) {
      iconElement.innerHTML = icon;
    }
    if (iconColor) iconElement.style.color = iconColor;
    if (iconBackground) iconElement.style.background = iconBackground;
    iconElement.style.borderRadius = iconBorderRadius;
    if (iconType !== "loader" || icon) {
      iconElement.style.animation = `${iconAnimation} 0.6s ${iconTimingFunction}`;
    }
  }

  if (newConfig.message) {
    const msgElement = toast.querySelector(".message");
    if (msgElement) {
      msgElement.innerHTML = newConfig.message.replace(/\n/g, "<br>");
    }
  }
  if (newConfig.autoClose !== false && newConfig.duration !== undefined) {
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.animation = `${
        newConfig.exitAnimation || "fadeOut"
      } 0.4s ease`;
      toast.addEventListener("animationend", () => toast.remove(), {
        once: true,
      });
    }, newConfig.duration);
  }
  document.body.removeChild(tempTheme);
}

export default toast;
