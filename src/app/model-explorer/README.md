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

Inference uses single-thread WebAssembly for compatibility without cross-origin isolation. The shared runtime and each selected model are lazily loaded; each model is about 11 MB. Uploaded files remain browser-local, are decoded before use, and are limited to JPEG/PNG/WebP, 10 MB, and 25 megapixels. Working images are capped at 1600 pixels on their longest side. Darkening alters pixels before inference; confidence changes only filter existing predictions. Illustrations and quizzes do not run the model.

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

## Classification and segmentation

- Classification uses `yolo11n-cls.onnx` with dynamic input axes, run at `[1, 3, 224, 224]`. A centered square crop is resized and RGB-normalized to 0–1. The model returns 1,000 ImageNet scores; the five highest are ranked and filtered by the slider. Labels in `imagenet.json` are extracted from the model metadata. No localization boxes are displayed.
- Segmentation uses `yolo11n-seg.onnx`, input `[1, 3, 480, 640]`, predictions `[1, 116, 6300]`, and prototypes `[1, 32, 120, 160]`. The same letterbox, score floor, and class-aware NMS apply. Each retained candidate’s 32 coefficients combine mask prototypes; logits above zero within its box become foreground. Padding is removed before masks are mapped onto the source image. Masks render beneath all labels and boxes.
- Changing tasks clears predictions and the brightness baseline. The default threshold is 5% for classification and 40% for the other modes.
- Additional model source: https://huggingface.co/unileon-robotics/YOLO11-ONNX (`yolo11n-seg.onnx` and `dynamic/yolo11n-cls.onnx`), under the existing AGPL-3.0 model license.
- `yolo11n-cls.onnx` SHA-256: `3ee1dc86fbab267887ddf3cbfde8310e014e27c043d21bd9898756f9d6634157`
- `yolo11n-seg.onnx` SHA-256: `f2616a376c3999dfecad4e1e4488c7a2729edf1c74081e74fdc9bdff4a1d6547`

### Additional verification (2026-11-08)

Browser inference on the city/bus sample returned minibus (45.6%), police van (33.9%), and bullet train (5.9%) above the classification threshold. Segmentation returned five predictions at 40%, with non-rectangular masks visually aligned to the image. Explorer-scoped TypeScript and ESLint checks pass. The full-project type check is blocked by the unrelated unfinished BERT lesson's missing `examples.json`. Slider and brightness interaction testing was completed on 2026-11-10 (see below).

### Control verification (2026-11-10)

- Segmentation: five visible predictions at 40%; zero at 94%. Darkening clears old masks before rerunning. At 5%, the original has eight predictions and the darkened image has seven, with changed scores.
- Switching from segmentation to classification clears masks, results, and the comparison baseline.
- Darkened classification: minibus 50.7% and police van 37.5% at the 5% threshold; zero visible labels at 95%.
- Verified slider changes using keyboard input, including Home and End.

## Current interface after the Learn redesign

The current explorer exposes object detection only. The classification, segmentation, and brightness-control notes above document the earlier interface; their model assets and inference support remain in the repository. BERT now has its own complete page at `/learn/bert`, and the full-project type check is no longer blocked by missing BERT data.
