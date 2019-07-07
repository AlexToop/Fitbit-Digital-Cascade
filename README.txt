Ensure apiKey is added to companion/index.js

terminal
    npm install at root
    npx fitbit-build
    npx fitbit
    fitbit$ install
    fitbit$ build // to rebuild
    ^ C x2 to quit

Note: https://github.com/kickstandapps/WeatherIcons
https://dev.fitbit.com/build/guides/design-guidelines/downloadable-assets/
https://dev.fitbit.com/build/guides/user-interface/css/#fonts
http://adamwhitcroft.com/climacons/

For images, install imagemagick with homebrew or something similar. 
Then:
    convert poweredby-oneline.png -resize 200x45 darkstep4.png
    convert darkstep2.png -colorspace gray darkstep3.png 