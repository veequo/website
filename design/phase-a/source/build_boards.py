"""Static SVG design boards only. Uses the Python standard library; no website code."""
from pathlib import Path
from base64 import b64encode
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]
C = dict(cream='#FFF8ED', aubergine='#56316D', coral='#F17C67', yellow='#F3C64D', ink='#271D32', peach='#FFE9D9', muted='#625867', surface='#FFFFFF', border='#E5D9D0')
fonts = ''.join('@font-face{font-family:'+name+';src:url(data:font/ttf;base64,'+b64encode((ROOT/'assets'/file).read_bytes()).decode()+');font-weight:100 900;}' for name,file in [('Bricolage','BricolageGrotesque.ttf'),('DM','DMSans.ttf')])

def rect(x,y,w,h,fill,rx=0,stroke='none',sw=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def path(d,fill='none',stroke=C['aubergine'],sw=3):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
def circle(x,y,r,fill,stroke='none',sw=1):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def txt(x,y,s,size=20,color=C['ink'],font='DM',weight=400):
    return f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(s)}</text>'
def lines(x,y,ss,size=20,leading=30,**kw):
    return ''.join(txt(x,y+i*leading,s,size,**kw) for i,s in enumerate(ss))
def logo(x,y,scale=1,color=C['aubergine'],symbol=False):
    # Original monoline geometric lettering; open e and forward-reaching q tail.
    d = ('M14 18 L32 66 Q36 76 40 66 L58 18 '
         'M84 44 H126 C126 8 78 6 78 43 C78 76 113 80 127 64 '
         'M199 45 C199 8 145 8 145 45 C145 81 199 81 199 45 '
         'M199 24 V85 Q199 104 221 94 '
         'M284 45 C284 8 232 8 232 45 C232 82 284 82 284 45 Z')
    if symbol:
        d='M70 45 C70 8 16 8 16 45 C16 81 70 81 70 45 M70 24 V85 Q70 104 92 94'
    return f'<g transform="translate({x} {y}) scale({scale})">'+path(d,stroke=color,sw=10)+'</g>'
def board(n,title,sub,body):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100"><title>{escape(title)}</title><desc>{escape(sub)}</desc><style>{fonts}</style>'
    svg+=rect(0,0,1600,1100,C['cream'])+txt(64,55,'VEQO / IDEAS IN FULL COLOR',15,C['aubergine'],weight=700)+txt(1210,55,'PHASE A · REVIEW 01',15,C['muted'])
    svg+=txt(64,130,title,52,font='Bricolage',weight=650)+txt(64,174,sub,20,C['muted'])+body
    svg+=path('M64 1036 H1536',stroke=C['border'],sw=1)+txt(64,1072,'DESIGN PROPOSAL · 28 OCT 2026 · Static artwork; no application or live controls.',15,C['muted'])+txt(1400,1072,f'A / 0{n}',16,C['aubergine'],weight=700)+'</svg>'
    (ROOT/'boards'/f'0{n}-{["identity","type-color","illustration-states"][n-1]}.svg').write_text(svg)

b=rect(64,220,950,490,C['peach'],28)+logo(155,284,2.65)+txt(112,628,'A little curiosity. A clear way forward.',35,font='Bricolage',weight=550)+txt(112,673,'Custom lowercase lettering · a q tail that carries the idea onward.',20,C['muted'])
b+=rect(1040,220,496,234,C['aubergine'],24)+logo(1123,266,1.15,C['cream'])+txt(1072,423,'02 / REVERSED',15,C['cream'])
b+=rect(1040,478,496,232,C['surface'],24,C['border'])+logo(1123,516,1.15,C['ink'])+txt(1072,678,'03 / SINGLE COLOR',15,C['muted'])
b+=txt(64,766,'One mark. Room to play.',32,font='Bricolage',weight=600)
b+=logo(70,801,1.1,symbol=True)+rect(235,810,64,64,C['aubergine'],14)+logo(245,819,.46,C['cream'],True)+rect(335,827,32,32,C['aubergine'],7)+logo(340,832,.23,C['cream'],True)
b+=lines(64,950,['Symbol study: large, 64 px and 32 px.','Final favicon optical tuning remains open.'],18,27,color=C['muted'])
b+=lines(620,823,['V / Vision', 'E / Enrichment'],25,65,font='Bricolage',weight=550)+lines(1060,823,['Q / Quality','O / Originality'],25,65,font='Bricolage',weight=550)
b+=txt(620,960,'Review: letter rhythm, q-tail direction and small-size recognition.',18,C['muted'])
board(1,'An identity with somewhere to go.','Foundation prototype / Custom vector wordmark and variant sheet. Not final production artwork.',b)

b=txt(64,255,'01 / THE CANVAS',16,C['muted'],weight=700)
colors=[('cream','Cream'),('aubergine','Aubergine'),('coral','Coral'),('yellow','Yellow'),('ink','Ink'),('peach','Soft peach')]
for i,(key,name) in enumerate(colors):
    x=64+i*247
    b+=rect(x,280,231,112,C[key],16,C['border'])+txt(x,425,name,21,weight=600)+txt(x,454,C[key],16,C['muted'])
b+=path('M64 496 H1536',stroke=C['border'],sw=1)
b+=txt(64,547,'02 / EXPRESSIVE HEADLINES',16,C['muted'],weight=700)
b+=lines(64,640,['Ideas become','something real.'],78,83,color=C['aubergine'],font='Bricolage',weight=650)
b+=txt(68,787,'Bricolage Grotesque / 650 / 78 px specimen',18,C['muted'])
b+=txt(920,547,'03 / PRECISE, HUMAN DETAILS',16,C['muted'],weight=700)
b+=txt(920,609,'Build with understanding.',32,font='Bricolage',weight=600)
b+=lines(920,654,['Guided student projects and thoughtful digital','products for businesses. A clear process,','from the first question to the next step.'],22,34)
b+=txt(920,799,'DM Sans / 400 body · 600 interface',18,C['muted'])
b+=rect(64,846,1472,140,C['peach'],20)
b+=txt(92,887,'A practical scale',24,font='Bricolage',weight=600)+txt(92,929,'Display 72 / 76 desktop · 44 / 48 mobile · Section 40 / 46 · Body 18 / 28 · Label 14 / 20',20)
b+=txt(92,963,'Space 4, 8, 12, 16, 24, 32, 48, 64, 96 · 1 px dividers · 12–24 px corners · flat surfaces first',17,C['muted'])
board(2,'Warmth, with a clear hierarchy.','The approved palette and type families, applied as a proposed design foundation.',b)

def illustration(x,y,s=1):
    g=path('M60 242 C-10 118 126 5 260 47 C346 -15 502 63 475 194 C572 287 401 395 290 356 C174 428 26 353 60 242',C['peach'],'none')
    g+=path('M38 205 C145 114 205 317 325 192 S443 130 503 164',stroke=C['aubergine'],sw=3)
    g+=circle(80,177,33,C['yellow'])+path('M66 178 Q81 153 94 178 M80 163 V193',stroke=C['ink'],sw=3)
    g+=rect(167,120,236,182,C['aubergine'],18)+rect(157,110,236,182,C['surface'],18,C['aubergine'],3)
    g+=path('M158 148 H391',stroke=C['aubergine'],sw=2)+circle(177,129,4,C['coral'])+circle(191,129,4,C['yellow'])+circle(205,129,4,C['aubergine'])
    g+=rect(177,169,75,99,C['peach'],8)+path('M190 242 L211 217 L237 229',stroke=C['aubergine'],sw=4)
    g+=rect(269,172,101,12,C['aubergine'],5)+rect(269,198,76,8,C['border'],4)+rect(269,216,90,8,C['border'],4)+rect(269,242,65,24,C['coral'],7)
    g+=path('M112 293 Q134 245 157 270 L183 311 Q201 337 228 310 L252 291 Q263 282 270 292 Q278 303 266 315 L230 355 Q189 395 153 355 Z',C['coral'],C['ink'],3)
    g+=path('M412 67 L427 40 L438 66 L466 78 L440 91 L429 119 L415 92 L389 80 Z',C['yellow'],C['ink'],2)
    g+=circle(447,278,27,C['aubergine'])+path('M436 278 L444 286 L459 269',stroke=C['cream'],sw=3)
    g+=txt(30,407,'01 / QUESTION',14,C['aubergine'],weight=700)+txt(208,407,'02 / MAKE',14,C['aubergine'],weight=700)+txt(400,407,'03 / REFINE',14,C['aubergine'],weight=700)
    return f'<g transform="translate({x} {y}) scale({s})">{g}</g>'
b=rect(64,220,864,724,C['surface'],24,C['border'])+illustration(130,250,1.35)+txt(104,865,'A question becomes a tangible product.',31,font='Bricolage',weight=600)+txt(104,910,'Original editorial vector study. No client work or product claim.',19,C['muted'])
b+=txt(976,258,'SHAPE & SURFACE',16,C['muted'],weight=700)
b+=rect(976,287,168,85,C['peach'],24)+circle(1193,329,40,C['yellow'])+path('M1284 369 L1328 287 L1372 369 Z',C['coral'],'none')
b+=lines(976,416,['Organic field + precise geometry.','3 px illustration strokes at 1×.','8 px offset shadow, used only on art.'],19,30)
b+=txt(976,554,'INTERFACE STATE SPECIMENS',16,C['muted'],weight=700)
for y,label,fill,focus in [(580,'Default',C['aubergine'],False),(652,'Hover',C['ink'],False),(724,'Keyboard focus',C['aubergine'],True),(796,'Active / pressed',C['ink'],False)]:
    if focus: b+=rect(972,y-4,251,60,'none',16,C['aubergine'],3)
    b+=rect(978,y+2,239,48,fill,10)+txt(995,y+33,'Explore student projects',17,C['cream'],weight=600)+txt(1240,y+33,label,18,C['muted'])
b+=lines(976,909,['Reduced motion: instant state feedback.','Static artwork; no continuous floating.'],18,28,color=C['muted'])
board(3,'Ideas, made tangible.','Illustration and component-state studies / These are static specimens, not working interface controls.',b)

def lum(h):
    a=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    a=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in a]
    return sum(v*w for v,w in zip(a,[.2126,.7152,.0722]))
pairs=[('ink','cream'),('aubergine','cream'),('muted','cream'),('cream','aubergine'),('ink','coral'),('ink','yellow'),('coral','cream'),('yellow','cream'),('border','cream'),('aubergine','surface')]
report=[]
for a,b in pairs:
    ratio=(max(lum(C[a]),lum(C[b]))+.05)/(min(lum(C[a]),lum(C[b]))+.05)
    report.append(dict(foreground=a,background=b,ratio=round(ratio,2),normal_text_AA=ratio>=4.5,non_text_AA=ratio>=3))
(ROOT/'contrast-check.json').write_text(json.dumps(report,indent=2)+'\n')
print('Wrote 3 SVG boards and computed sRGB contrast ratios.')
