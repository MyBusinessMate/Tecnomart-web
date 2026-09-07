"use client";

const SPUN_STORAGE_KEY = "technomart_has_spun";
const SESSION_STORAGE_KEY = "technomart_claimed_session";
const DEVICE_STORAGE_KEY = "technomart_device_signature";

/**
 * Murmur3-style deterministic 32-bit string hash
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "hw_" + Math.abs(hash).toString(36) + "_" + str.length.toString(36);
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return "no_webgl";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    let vendor = "";
    let renderer = "";

    if (debugInfo) {
      vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";
      renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
    } else {
      vendor = gl.getParameter(gl.VENDOR) || "";
      renderer = gl.getParameter(gl.RENDERER) || "";
    }

    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0;
    return `${vendor}~${renderer}~tex${maxTextureSize}`;
  } catch {
    return "webgl_err";
  }
}

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no_canvas";

    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial', sans-serif";
    ctx.fillStyle = "#f60";
    ctx.fillRect(10, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("TecnoMart Rewards", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("TecnoMart Rewards", 4, 17);

    return hashString(canvas.toDataURL());
  } catch {
    return "canvas_err";
  }
}

export function getDeviceAndHardwareId(): { deviceId: string; hardwareHash: string } {
  if (typeof window === "undefined") {
    return { deviceId: "ssr_device", hardwareHash: "ssr_hw" };
  }

  let deviceId = localStorage.getItem(DEVICE_STORAGE_KEY);
  if (!deviceId) {
    deviceId = "tm_dev_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
  }

  const screenMetrics = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const cpuCores = navigator.hardwareConcurrency || 4;
  const webgl = getWebGLFingerprint();
  const canvasHash = getCanvasFingerprint();

  const hardwareRaw = [screenMetrics, cpuCores, webgl, canvasHash].join("::");
  const hardwareHash = hashString(hardwareRaw);

  return { deviceId, hardwareHash };
}

export function hasUserParticipated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SPUN_STORAGE_KEY) === "true";
}

export function markUserParticipated(sessionId?: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SPUN_STORAGE_KEY, "true");
  if (sessionId) {
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
}

export function clearParticipationLocks(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SPUN_STORAGE_KEY);
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
