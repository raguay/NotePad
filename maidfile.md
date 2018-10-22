## build

```bash
cd Development
mint build --relative
rm dist/icon-*.png
rm dist/index.html
rm -R ../Application/NotePad/notepad/*
cp -R dist/* ../Application/NotePad/notepad
cp ../Documents/index.html ../Application/NotePad/notepad
cd ..
```

## build-app
```bash
cd Development
mint build --relative
rm dist/icon-*.png
rm dist/index.html
rm -R ../Application/NotePad/notepad/*
cp -R dist/* ../Application/NotePad/notepad
cp ../Documents/index.html ../Application/NotePad/notepad
if [[ ! -d '../Application/NotePad.app/Contents/Resources/app.nw' ]]; then
   mkdir '../Application/NotePad.app/Contents/Resources/app.nw'
fi
if [[ -f '../Application/NotePad.app/Contents/Resources/app.nw/main.js' ]]; then
   rm -R ../Application/NotePad.app/Contents/Resources/app.nw/*
fi
cp -R ../Application/NotePad/* ../Application/NotePad.app/Contents/Resources/app.nw
cd ..
```
## launch

```bash
/Applications/nwjs/nwjs.app/Contents/MacOS/nwjs Application/NotePad
```

## launch-app

```bash
open Application/NotePad.app
```
