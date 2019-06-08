function mySettings(props) {
    return (
        <Page>
            <Section
                title={<Text bold align="center">Text Colour (Default Deep Orange)</Text>}>
                <ColorSelect
                    settingsKey="textColour"
                    colors={[
                        {color: "#F64C11"},
                        {color: "#007BBF"},
                        {color: "#FFB003"},
                        {color: "#149E4E"},
                        {color: "#DF75E8"},
                        {color: "#E7EAE9"},
                        {color: "#000000"},
                        {color: "#2A363B"},
                        {color: "#334764"}
                    ]}
                />
            </Section>
            <Section
                title={<Text bold align="center">Background Colour (Default Black)</Text>}>
                <ColorSelect
                    settingsKey="backgroundColour"
                    colors={[
                        {color: "#000000"},
                        {color: "#2A363B"},
                        {color: "#7c7a7b"},
                        {color: "#334764"},
                        {color: "#90230E"},
                        {color: "#68A9AF"},
                        {color: "#035250"},
                        {color: "#7A6A53"},
                        {color: "#F06B50"}
                    ]}
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