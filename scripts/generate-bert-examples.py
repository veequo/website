"""Generate measured BERT examples. Requires torch and transformers."""
import json
from pathlib import Path
import torch
from transformers import AutoTokenizer, AutoModelForMaskedLM

MODEL = 'google-bert/bert-base-uncased'
REVISION = '86b5e0934494bd15c9632b12f734a8a67f723594'
tokenizer = AutoTokenizer.from_pretrained(MODEL, revision=REVISION)
model = AutoModelForMaskedLM.from_pretrained(MODEL, revision=REVISION, attn_implementation='eager')
model.eval()
sentences = ['She deposited money at the bank.', 'She sat beside the river bank.', 'The tired dog slept beside the door.']
examples = []
with torch.inference_mode():
    for sentence in sentences:
        inputs = tokenizer(sentence, return_tensors='pt')
        result = model(**inputs, output_attentions=True)
        examples.append({'sentence': sentence, 'tokens': tokenizer.convert_ids_to_tokens(inputs['input_ids'][0]), 'attention': [[[ [round(float(v), 6) for v in row] for row in head] for head in layer[0]] for layer in result.attentions]})
    masks = []
    for sentence in ['She deposited [MASK] at the bank.', 'She sat beside the [MASK] bank.', 'The tired dog [MASK] beside the door.']:
        inputs = tokenizer(sentence, return_tensors='pt')
        result = model(**inputs)
        index = (inputs['input_ids'][0] == tokenizer.mask_token_id).nonzero().item()
        scores, ids = result.logits[0,index].softmax(-1).topk(5)
        masks.append({'sentence': sentence, 'predictions': [{'token': tokenizer.decode([int(i)]), 'score': round(float(s), 6)} for s,i in zip(scores, ids)]})
output = {'model': MODEL, 'revision': REVISION, 'examples': examples, 'masks': masks}
Path('src/app/learn/bert/examples.json').write_text(json.dumps(output, separators=(',', ':')))
print('Saved measured attention for 3 sentences, all 12 layers and 12 heads, plus 3 masked-token examples.')
