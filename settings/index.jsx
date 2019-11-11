function mySettings(props) {
    let colorSet = [
        {color: "#000000"},
        {color: "#334764"},
        {color: "#FECEA8"},
        {color: "#f57d26"},
        {color: "#3182DE"},
        {color: "#FCE205"},
        {color: "#00A629"},
        {color: "#F83C40"},
        {color: "#F64C11"},
        {color: "#D828B8"},
        {color: "#FFFFFF"}
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