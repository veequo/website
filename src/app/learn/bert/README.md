# BERT learning page

Route: `/learn/bert`. Listed in `src/content/learning.ts`.

The context-clue illustration is editorial. Attention and masked-token examples in
`examples.json` are actual, precomputed outputs from `google-bert/bert-base-uncased`.
The page does not perform live inference or send visitor text to a service.

Regenerate from the repository root with Python, torch, and transformers installed:

```sh
python scripts/generate-bert-examples.py
```

The JSON records the model revision. Attention axes are
`example → layer → head → query token → key token`, including special tokens.
The model runs in evaluation mode with eager attention. Displayed percentages
are rounded; raw rows sum approximately to one. Predictions cover the top five
vocabulary tokens for one masked position. The browser only receives the small
results file, not the model weights.
