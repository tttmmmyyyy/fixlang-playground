# https://stackoverflow.com/questions/29804118/how-to-build-a-mode-in-ace
git clone https://github.com/ajaxorg/ace.git
cp fixlang_highlight_rules.js ace/lib/ace/mode
cp fixlang.js ace/lib/ace/mode
cd ace
node ./Makefile.dryice.js -nc
cd ..
cp ace/build/src-noconflict/mode-fixlang.js src-noconflict/