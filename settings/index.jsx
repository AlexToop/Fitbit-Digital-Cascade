function mySettings(props) {
    let colorSet = [
        {color: "#000000"},
        {color: "#334764"},
        {color: "#c4b9a4"},
        {color: "#f57d26"},
        {color: "#3182DE"},
        {color: "#8080FF"},
        {color: "#14D3F5"},
        {color: "#505050"},
        {color: "#303030"},
        {color: "#00A629"},
        {color: "#134022"},
        {color: "#5B4CFF"},
        {color: "#BCD8F8"},
        {color: "#A0A0A0"},
        {color: "#B8FC68"},
        {color: "#F80070"},
        {color: "#5BE37D"},
        {color: "#FC6B3A"},
        {color: "#FFCC33"},
        {color: "#F83478"},
        {color: "#A51E7C"},
        {color: "#BD4EFC"},
        {color: "#F83C40"},
        {color: "#7090B5"},
        {color: "#1B2C40"},
        {color: "#D828B8"},
        {color: "#FFFFFF"},
        {color: "#E4FA3C"},
        {color: "#394003"},
        {color: "#FFB6C1"},
        {color: "#FFA07A"},
        {color: "#c7a270"},
        {color: "#7095c7"},
        {color: "#c77770"},
        {color: "#c1c770"},
        {color: "#c49c67"}
    ];
    return (
        <Page>
            <Section
                title={<Text bold align="center">Text Colour (Default Deep Orange)</Text>}>
                <ColorSelect
                    settingsKey="textColour"
                    colors={colorSet}
                />
            </Section>
            <Section
                title={<Text bold align="center">Background Colour (Default Black)</Text>}>
                <ColorSelect
                    settingsKey="backgroundColour"
                    colors={colorSet}
                />
            </Section>
            <Section
                title={<Text bold align="center">General text</Text>}>
                <ColorSelect
                    settingsKey="generalTextColour"
                    colors={colorSet}
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(mySettings);

// <Section
//   title={<Text bold align="center">Weather Provider (Default OpenWeatherMap)</Text>}>
//   <Select
//     label={`Provider Selection:`}
//     settingsKey="weather"
//     options={[
//       {name:"OpenWeatherMap"},
//       {name:"Dark Sky"}
//     ]}
//   />
// </Section>