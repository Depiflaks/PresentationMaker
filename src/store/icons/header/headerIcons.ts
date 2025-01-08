import logo from "~/views/assets/logo.svg";
import save from "~/views/assets/header/save.svg";
import logout from "~/views/assets/header/logout.svg";
import importImg from "~/views/assets/header/import.svg";
import exportImg from "~/views/assets/header/export.svg";

type headerIcons = {
    logo: string;
    save: string;
    logout: string;
    import: string;
    export: string;
};

export const headerIconsMap: headerIcons = {
    logo: logo,
    save: save,
    logout: logout,
    import: importImg,
    export: exportImg
}