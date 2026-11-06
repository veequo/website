# Veqo model explorer

A self-contained feature at `/model-explorer`, retaining the existing Veqo layout, fonts, and color tokens. No existing pages or navigation were changed.

## Run

From the repository root, run `pnpm dev`, then open http://localhost:3000/model-explorer. The production build includes this route. No Python service, API key, or external inference endpoint is required.

## Files

- `explorer.tsx`: learning views, image upload, experiment controls, results, and quiz.
- `inference.ts`: lazy ONNX Runtime loading, letterbox preprocessing, YOLO11 decoding, and class-aware non-maximum suppression.
- `content.ts`: model-specific educational content and Python example.
- `explorer.module.css`: scoped responsive design using existing brand variables.
- `public/model-explorer`: local model, samples, runtime, and upstream licenses.

## Inference contract

YOLO11n COCO detection ONNX, input float32 `[1, 3, 640, 640]`, output `[1, 84, 8400]`. RGB channels are normalized to 0–1 after aspect-preserving resize and centered padding with pixel value 114. The highest-scoring class per candidate is retained, with a 0.05 score floor. Class-aware NMS uses IoU 0.45, with up to 100 results. Boxes are mapped to normalized original-image coordinates and displayed at the selected 0.05–0.95 threshold.

Inference uses single-thread WebAssembly for compatibility without cross-origin isolation. Runtime and model are lazily loaded, totaling about 24 MB. Uploaded files remain browser-local, are decoded before use, and are limited to JPEG/PNG/WebP, 10 MB, and 25 megapixels. Working images are capped at 1600 pixels on their longest side. Darkening alters pixels before inference; confidence changes only filter existing predictions. Illustrations and quizzes do not run the model.

## Provenance

- Model: https://huggingface.co/webnn/yolo11n/blob/main/onnx/yolo11n.onnx
- SHA-256: `7d8fd1717d9d5bbab6986cd134afb620649c7a394303d55b1e09fc00804cc5c1`
- Model documentation: https://docs.ultralytics.com/models/yolo11/
- Weights and samples: Ultralytics, AGPL-3.0; see `public/model-explorer/MODEL-LICENSE` and https://www.ultralytics.com/license.
- Samples: https://github.com/ultralytics/ultralytics/tree/main/ultralytics/assets (`bus.jpg`, `zidane.jpg`, renamed locally to `football.jpg`).
- Runtime: ONNX Runtime Web 1.24.3, downloaded from the npm distribution through jsDelivr. MIT license included at `public/model-explorer/runtime/LICENSE`. Source: https://github.com/microsoft/onnxruntime/tree/v1.24.3.
- Hero and pipeline illustrations: original SVG/CSS, explicitly labeled as conceptual.

## Validation

- TypeScript and production Next.js build pass.
- Actual browser inference on the bus sample: four visible predictions at 0.40; no visible predictions at 0.95.
- Darkened sample at 35% brightness: five visible predictions at 0.40, with new scores and coordinates.
- Runtime execution verified in the desktop app's browser. Performance on representative student laptops is still to be measured.

This is an educational prototype, not a calibrated measurement tool. Deployment must accommodate the bundled model/runtime asset sizes and the model license.
