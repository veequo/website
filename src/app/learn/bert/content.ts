export const stages = [
  ['Split', 'A sentence becomes tokens.', 'BERT uses WordPiece tokens: a word, punctuation mark, or part of a word. [CLS] marks the start, [SEP] marks a boundary, and ## indicates a word continuation.'],
  ['Represent', 'Give each token a starting point.', 'BERT adds token, position, and segment embeddings. These numerical vectors carry identity, order, and input-segment information. They are not written definitions.'],
  ['Connect', 'Gather information from the sequence.', 'Self-attention lets each token combine information from tokens on both sides, including itself. Each head learns its own query, key, and value transformations.'],
  ['Refine', 'Build context across layers.', 'Attention outputs are combined, then feed-forward processing further transforms each position. Residual connections and normalization help carry and stabilize information through the stack.'],
  ['Use', 'Turn representations into predictions.', 'A trained task-specific output layer can predict token labels, an answer span, or a sentence category. The [CLS] representation is commonly used for classification; it is not automatically a perfect sentence summary.'],
];
export const quiz = [
  {question: 'Why does “bank” get a different representation in each sentence?', options: ['Its spelling changes', 'Its surrounding context changes', 'Each meaning has a fixed attention head'], answer: 1, explanation: 'The same token is updated using different surrounding tokens.'},
  {question: 'Does each attention head have a predefined job?', options: ['Yes, each head is assigned a grammar rule', 'No, its patterns are learned', 'Yes, one head always handles emotion'], answer: 1, explanation: 'Patterns can overlap and depend on the input and layer. Head numbers are not named roles.'},
  {question: 'How do BERT Base’s heads and layers relate?', options: ['12 heads total, one per layer', '12 sequential layers, with 12 parallel heads in each', '12 heads run one after another'], answer: 1, explanation: 'Heads work in parallel within a layer. Layers update representations in sequence.'},
  {question: 'Does a large attention weight fully explain a prediction?', options: ['Yes, it proves which word caused it', 'No, it shows only part of the computation', 'Yes, it measures prediction accuracy'], answer: 1, explanation: 'Attention mixes value vectors. Other heads, layers, residual paths, and transformations also contribute.'},
];
export const pythonExample = `# Install: pip install torch transformers
from transformers import pipeline

fill_mask = pipeline(
    "fill-mask",
    model="google-bert/bert-base-uncased",
)

sentence = input("Enter a sentence with one [MASK]: ")
if sentence.count("[MASK]") != 1:
    raise ValueError("Use exactly one [MASK] token.")

for prediction in fill_mask(sentence, top_k=5):
    print(prediction["token_str"], round(prediction["score"], 4))

# Scores are model probabilities over vocabulary replacements.
# They do not measure whether the completed sentence is true.`;
