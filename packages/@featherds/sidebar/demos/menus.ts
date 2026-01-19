import { MenuListEntry } from "@featherds/menu";
import { FeatherIcon } from "@featherds/icon";
import Security from "@featherds/icon/hardware/Security";
import Location from "@featherds/icon/action/Location";
import LogOut from "@featherds/icon/action/LogOut";
import Settings from "@featherds/icon/action/Settings";
import Help from "@featherds/icon/action/Help";
import FeedbackAlt from "@featherds/icon/action/FeedbackAlt";
import ApiConfig from "@featherds/icon/network/ApiConfig";
import LightDarkMode from "@featherds/icon/action/LightDarkMode";
import Notifications from "@featherds/icon/action/Notifications";
import NotificationsOff from "@featherds/icon/notification/NotificationsOff";
import Lock from "@featherds/icon/action/Lock";
import Cloud from "@featherds/icon/action/Cloud";
import CloudDownload from "@featherds/icon/action/CloudDownload";
import ManageProfile from "@featherds/icon/action/ManageProfile";
import Wifi from "@featherds/icon/notification/Wifi";
import Share from "@featherds/icon/action/Share";
import Info from "@featherds/icon/action/Info";
import UpdateUtilities from "@featherds/icon/action/UpdateUtilities";

export const accountMenu: MenuListEntry[] = [
  {
    id: "account-header",
    type: "header",
    title: "My Profile",
  },
  {
    id: "edit-location",
    type: "item",
    title: "Edit Location",
    href: "/edit-location",
    target: "_account",
    icon: Location as typeof FeatherIcon,
  },
  {
    id: "my-security-officer",
    type: "item",
    title: "My Security Officer",
    href: "/security-officer",
    target: "_account",
    icon: Security as typeof FeatherIcon,
  },
  {
    id: "separator",
    type: "separator",
  },
  {
    id: "logout",
    type: "item",
    title: "Logout",
    href: "/logout",
    target: "_account",
    icon: LogOut as typeof FeatherIcon,
  },
];

export const helpMenu: MenuListEntry[] = [
  {
    id: "help-header",
    type: "header",
    title: "Help Center",
  },
  {
    id: "help",
    type: "item",
    title: "Help",
    href: "/help",
    target: "_blank",
    icon: Help as typeof FeatherIcon,
  },
  {
    id: "feedback",
    type: "item",
    title: "Feedback",
    href: "/feedback",
    target: "_blank",
    icon: FeedbackAlt as typeof FeatherIcon,
  },
];
export const settingsMenu: MenuListEntry[] = [
  {
    id: "settings-header",
    type: "header",
    title: "Local Settings",
  },
  {
    id: "settings",
    type: "item",
    title: "Settings",
    href: "/settings",
    target: "_settings",
    icon: Settings as typeof FeatherIcon,
  },
  {
    id: "api-config",
    type: "item",
    title: "API Config",
    href: "/api-config",
    target: "_settings",
    icon: ApiConfig as typeof FeatherIcon,
  },
  {
    id: "theme-settings",
    type: "item",
    title: "Theme Settings",
    href: "/theme-settings",
    target: "_settings",
    icon: LightDarkMode as typeof FeatherIcon,
  },
  {
    id: "notifications-settings",
    type: "item",
    title: "Notifications",
    href: "/notifications",
    target: "_settings",
    icon: Notifications as typeof FeatherIcon,
  },
  {
    id: "notification-disable",
    type: "item",
    title: "Disable Notifications",
    href: "/notifications/disable",
    target: "_settings",
    icon: NotificationsOff as typeof FeatherIcon,
  },
  {
    id: "privacy-settings",
    type: "item",
    title: "Privacy & Security",
    href: "/privacy",
    target: "_settings",
    icon: Lock as typeof FeatherIcon,
  },
  {
    id: "cloud-settings",
    type: "item",
    title: "Cloud Storage",
    href: "/cloud-storage",
    target: "_settings",
    icon: Cloud as typeof FeatherIcon,
  },
  {
    id: "backup-settings",
    type: "item",
    title: "Backup & Sync",
    href: "/backup",
    target: "_settings",
    icon: CloudDownload as typeof FeatherIcon,
  },
  {
    id: "profile-settings",
    type: "item",
    title: "Profile Management",
    href: "/profile",
    target: "_settings",
    icon: ManageProfile as typeof FeatherIcon,
  },
  {
    id: "network-settings",
    type: "item",
    title: "Network & WiFi",
    href: "/network",
    target: "_settings",
    icon: Wifi as typeof FeatherIcon,
  },
  {
    id: "share-settings",
    type: "item",
    title: "Sharing Options",
    href: "/sharing",
    target: "_settings",
    icon: Share as typeof FeatherIcon,
  },
  {
    id: "app-info",
    type: "item",
    title: "App Information",
    href: "/app-info",
    target: "_settings",
    icon: Info as typeof FeatherIcon,
  },
  {
    id: "system-updates",
    type: "item",
    title: "System Updates",
    href: "/updates",
    target: "_settings",
    icon: UpdateUtilities as typeof FeatherIcon,
  },
];
