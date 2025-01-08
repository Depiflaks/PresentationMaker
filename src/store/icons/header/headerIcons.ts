import logo from "~/views/assets/logo.svg";
import save from "~/views/assets/header/save.svg";
import logout from "~/views/assets/header/logout.svg";
import importImg from "~/views/assets/header/import.svg";
import exportImg from "~/views/assets/header/export.svg";
import alert from "~/views/assets/header/alert.svg";

type headerIcons = {
    logo: string;
    save: string;
    logout: string;
    import: string;
    export: string;
    alert: string;
};

export const headerIconsMap: headerIcons = {
    logo: logo,
    save: save,
    logout: logout,
    import: importImg,
    export: exportImg,
    alert: alert
}