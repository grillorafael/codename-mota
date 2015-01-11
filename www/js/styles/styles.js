function Style() {}

Style.Text = {
    font: "40px Arial",
    fill: "#ff0044",
    align: "center"
};

Style.TextTitle = {};
jQuery.extend(Style.TextTitle, Style.Text);
Style.TextTitle.font = "100px Arial";
