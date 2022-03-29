
  <template>
  <section>
    <h2>Feather</h2>
    <section class="icons">
      <FeatherIcon v-for="icon in featherIcons" :icon="icon.icon" :key="icon.key"></FeatherIcon>
    </section>
  </section>
</template>

  <script>
  import * as components from "./../src";
import communicationCertificate from "@featherds/icon/communication/Certificate";

import communicationCertificateAlt from "@featherds/icon/communication/CertificateAlt";

import communicationChat from "@featherds/icon/communication/Chat";

import communicationContacts from "@featherds/icon/communication/Contacts";

import communicationDocumentation from "@featherds/icon/communication/Documentation";

import communicationIdCard from "@featherds/icon/communication/IdCard";

import communicationPhone from "@featherds/icon/communication/Phone";

import contentBlogArticle from "@featherds/icon/content/BlogArticle";

import contentVideo from "@featherds/icon/content/Video";

import fileAttachment from "@featherds/icon/file/Attachment";

import fileFolder from "@featherds/icon/file/Folder";

import fileFolderAdd from "@featherds/icon/file/FolderAdd";

import fileFolderLocked from "@featherds/icon/file/FolderLocked";

import fileFolderOpen from "@featherds/icon/file/FolderOpen";

import fileGeneric from "@featherds/icon/file/Generic";

import fileImage from "@featherds/icon/file/Image";

import filePdf from "@featherds/icon/file/Pdf";

import fileText from "@featherds/icon/file/Text";

import fileWordDoc from "@featherds/icon/file/WordDoc";

import fileXls from "@featherds/icon/file/Xls";

import fileZip from "@featherds/icon/file/Zip";

import hardwareAppliances from "@featherds/icon/hardware/Appliances";

import hardwareAppliancesAlt from "@featherds/icon/hardware/AppliancesAlt";

import hardwareApplianceProfiles from "@featherds/icon/hardware/ApplianceProfiles";

import hardwareDesktopWindows from "@featherds/icon/hardware/DesktopWindows";

import hardwareInstances from "@featherds/icon/hardware/Instances";

import hardwareKeyboardArrowDown from "@featherds/icon/hardware/KeyboardArrowDown";

import hardwareKeyboardArrowUp from "@featherds/icon/hardware/KeyboardArrowUp";

import hardwareLaptop from "@featherds/icon/hardware/Laptop";

import hardwareMinionProfiles from "@featherds/icon/hardware/MinionProfiles";

import hardwareNetwork from "@featherds/icon/hardware/Network";

import hardwareNetworkProfiles from "@featherds/icon/hardware/NetworkProfiles";

import hardwareRouter from "@featherds/icon/hardware/Router";

import hardwareSecurity from "@featherds/icon/hardware/Security";

import hardwareServer from "@featherds/icon/hardware/Server";

import hardwareVirtualMachine from "@featherds/icon/hardware/VirtualMachine";

import hardwareVirtualMachineAlt from "@featherds/icon/hardware/VirtualMachineAlt";

import actionAccountCircle from "@featherds/icon/action/AccountCircle";

import actionAdd from "@featherds/icon/action/Add";

import actionAddCircleAlt from "@featherds/icon/action/AddCircleAlt";

import actionAddComment from "@featherds/icon/action/AddComment";

import actionAddNote from "@featherds/icon/action/AddNote";

import actionAddUser from "@featherds/icon/action/AddUser";

import actionArchive from "@featherds/icon/action/Archive";

import actionAssignTo from "@featherds/icon/action/AssignTo";

import actionAttachEmail from "@featherds/icon/action/AttachEmail";

import actionAttachFile from "@featherds/icon/action/AttachFile";

import actionBuild from "@featherds/icon/action/Build";

import actionBusiness from "@featherds/icon/action/Business";

import actionCalendar from "@featherds/icon/action/Calendar";

import actionCalendarEndDate from "@featherds/icon/action/CalendarEndDate";

import actionCalendarStartDate from "@featherds/icon/action/CalendarStartDate";

import actionCancel from "@featherds/icon/action/Cancel";

import actionChangeOwner from "@featherds/icon/action/ChangeOwner";

import actionCheckCircle from "@featherds/icon/action/CheckCircle";

import actionCloud from "@featherds/icon/action/Cloud";

import actionCloudDownload from "@featherds/icon/action/CloudDownload";

import actionCloudUpload from "@featherds/icon/action/CloudUpload";

import actionCode from "@featherds/icon/action/Code";

import actionComment from "@featherds/icon/action/Comment";

import actionContactSupport from "@featherds/icon/action/ContactSupport";

import actionContentCopy from "@featherds/icon/action/ContentCopy";

import actionContentPaste from "@featherds/icon/action/ContentPaste";

import actionCycle from "@featherds/icon/action/Cycle";

import actionDashboard from "@featherds/icon/action/Dashboard";

import actionDateRange from "@featherds/icon/action/DateRange";

import actionDelete from "@featherds/icon/action/Delete";

import actionDownloadFile from "@featherds/icon/action/DownloadFile";

import actionEdit from "@featherds/icon/action/Edit";

import actionEditMode from "@featherds/icon/action/EditMode";

import actionEmail from "@featherds/icon/action/Email";

import actionEmailDraft from "@featherds/icon/action/EmailDraft";

import actionEmailInbox from "@featherds/icon/action/EmailInbox";

import actionEmailSecure from "@featherds/icon/action/EmailSecure";

import actionExitToApp from "@featherds/icon/action/ExitToApp";

import actionExpand from "@featherds/icon/action/Expand";

import actionFeedback from "@featherds/icon/action/Feedback";

import actionFeedbackAlt from "@featherds/icon/action/FeedbackAlt";

import actionFileCopy from "@featherds/icon/action/FileCopy";

import actionFilterAlt from "@featherds/icon/action/FilterAlt";

import actionHelp from "@featherds/icon/action/Help";

import actionHide from "@featherds/icon/action/Hide";

import actionHome from "@featherds/icon/action/Home";

import actionInfo from "@featherds/icon/action/Info";

import actionInformationExchange from "@featherds/icon/action/InformationExchange";

import actionLightDarkMode from "@featherds/icon/action/LightDarkMode";

import actionLink from "@featherds/icon/action/Link";

import actionList from "@featherds/icon/action/List";

import actionLocation from "@featherds/icon/action/Location";

import actionLocationCity from "@featherds/icon/action/LocationCity";

import actionLock from "@featherds/icon/action/Lock";

import actionLockPasswordProtected from "@featherds/icon/action/LockPasswordProtected";

import actionLoggerConfigs from "@featherds/icon/action/LoggerConfigs";

import actionLogIn from "@featherds/icon/action/LogIn";

import actionLogOut from "@featherds/icon/action/LogOut";

import actionManageProfile from "@featherds/icon/action/ManageProfile";

import actionMarkComplete from "@featherds/icon/action/MarkComplete";

import actionMarkIncomplete from "@featherds/icon/action/MarkIncomplete";

import actionMarkRead from "@featherds/icon/action/MarkRead";

import actionMarkUnread from "@featherds/icon/action/MarkUnread";

import actionNotifications from "@featherds/icon/action/Notifications";

import actionOptions from "@featherds/icon/action/Options";

import actionPerson from "@featherds/icon/action/Person";

import actionPin from "@featherds/icon/action/Pin";

import actionPlayCircle from "@featherds/icon/action/PlayCircle";

import actionPrint from "@featherds/icon/action/Print";

import actionRemove from "@featherds/icon/action/Remove";

import actionRemoveUser from "@featherds/icon/action/RemoveUser";

import actionReporting from "@featherds/icon/action/Reporting";

import actionRestore from "@featherds/icon/action/Restore";

import actionSearch from "@featherds/icon/action/Search";

import actionSend from "@featherds/icon/action/Send";

import actionSendWorkflow from "@featherds/icon/action/SendWorkflow";

import actionSettings from "@featherds/icon/action/Settings";

import actionShare from "@featherds/icon/action/Share";

import actionSort from "@featherds/icon/action/Sort";

import actionSubscriptions from "@featherds/icon/action/Subscriptions";

import actionSupportCenter from "@featherds/icon/action/SupportCenter";

import actionUnlock from "@featherds/icon/action/Unlock";

import actionUpdateSchedules from "@featherds/icon/action/UpdateSchedules";

import actionUpdateUtilities from "@featherds/icon/action/UpdateUtilities";

import actionUploadFile from "@featherds/icon/action/UploadFile";

import actionVerifedUser from "@featherds/icon/action/VerifedUser";

import actionView from "@featherds/icon/action/View";

import actionViewDetails from "@featherds/icon/action/ViewDetails";

import actionWorkflow from "@featherds/icon/action/Workflow";

import medicalAmbulance from "@featherds/icon/medical/Ambulance";

import medicalCostSavings from "@featherds/icon/medical/CostSavings";

import medicalDrug from "@featherds/icon/medical/Drug";

import medicalDrugGroupId from "@featherds/icon/medical/DrugGroupId";

import medicalHospital from "@featherds/icon/medical/Hospital";

import medicalPatient from "@featherds/icon/medical/Patient";

import medicalPayor from "@featherds/icon/medical/Payor";

import medicalProvider from "@featherds/icon/medical/Provider";

import medicalProviderOffice from "@featherds/icon/medical/ProviderOffice";

import medicalTreatment from "@featherds/icon/medical/Treatment";

import medicalTreatmentCycle from "@featherds/icon/medical/TreatmentCycle";

import medicalTreatmentSchedule from "@featherds/icon/medical/TreatmentSchedule";

import medicalVitals from "@featherds/icon/medical/Vitals";

import navigationApps from "@featherds/icon/navigation/Apps";

import navigationAppsGetMore from "@featherds/icon/navigation/AppsGetMore";

import navigationArrowBack from "@featherds/icon/navigation/ArrowBack";

import navigationArrowDropDown from "@featherds/icon/navigation/ArrowDropDown";

import navigationCancel from "@featherds/icon/navigation/Cancel";

import navigationChevronLeft from "@featherds/icon/navigation/ChevronLeft";

import navigationChevronRight from "@featherds/icon/navigation/ChevronRight";

import navigationExpandLess from "@featherds/icon/navigation/ExpandLess";

import navigationExpandMore from "@featherds/icon/navigation/ExpandMore";

import navigationFirstPage from "@featherds/icon/navigation/FirstPage";

import navigationFullscreen from "@featherds/icon/navigation/Fullscreen";

import navigationFullscreenExit from "@featherds/icon/navigation/FullscreenExit";

import navigationGridView from "@featherds/icon/navigation/GridView";

import navigationLastPage from "@featherds/icon/navigation/LastPage";

import navigationMenu from "@featherds/icon/navigation/Menu";

import navigationMenuClose from "@featherds/icon/navigation/MenuClose";

import navigationMenuOpen from "@featherds/icon/navigation/MenuOpen";

import navigationMoreHoriz from "@featherds/icon/navigation/MoreHoriz";

import navigationMoreVert from "@featherds/icon/navigation/MoreVert";

import navigationRefresh from "@featherds/icon/navigation/Refresh";

import navigationSubdirectoryArrowLeft from "@featherds/icon/navigation/SubdirectoryArrowLeft";

import navigationSubdirectoryArrowRight from "@featherds/icon/navigation/SubdirectoryArrowRight";

import navigationUnfoldLess from "@featherds/icon/navigation/UnfoldLess";

import navigationUnfoldMore from "@featherds/icon/navigation/UnfoldMore";

import notificationConnected from "@featherds/icon/notification/Connected";

import notificationError from "@featherds/icon/notification/Error";

import notificationUnconnected from "@featherds/icon/notification/Unconnected";

import notificationWarning from "@featherds/icon/notification/Warning";

import notificationWifi from "@featherds/icon/notification/Wifi";

import notificationWifiNoConnection from "@featherds/icon/notification/WifiNoConnection";

import notificationWifiOff from "@featherds/icon/notification/WifiOff";

import notificationWifiSignalBad from "@featherds/icon/notification/WifiSignalBad";

import notificationWifiStatusBar from "@featherds/icon/notification/WifiStatusBar";



export default {
  data(){
    return {
      featherIcons:[{ icon: communicationCertificate, key: "communicationCertificate" },
        { icon: communicationCertificateAlt, key: "communicationCertificateAlt" },
        { icon: communicationChat, key: "communicationChat" },
        { icon: communicationContacts, key: "communicationContacts" },
        { icon: communicationDocumentation, key: "communicationDocumentation" },
        { icon: communicationIdCard, key: "communicationIdCard" },
        { icon: communicationPhone, key: "communicationPhone" },
        { icon: contentBlogArticle, key: "contentBlogArticle" },
        { icon: contentVideo, key: "contentVideo" },
        { icon: fileAttachment, key: "fileAttachment" },
        { icon: fileFolder, key: "fileFolder" },
        { icon: fileFolderAdd, key: "fileFolderAdd" },
        { icon: fileFolderLocked, key: "fileFolderLocked" },
        { icon: fileFolderOpen, key: "fileFolderOpen" },
        { icon: fileGeneric, key: "fileGeneric" },
        { icon: fileImage, key: "fileImage" },
        { icon: filePdf, key: "filePdf" },
        { icon: fileText, key: "fileText" },
        { icon: fileWordDoc, key: "fileWordDoc" },
        { icon: fileXls, key: "fileXls" },
        { icon: fileZip, key: "fileZip" },
        { icon: hardwareAppliances, key: "hardwareAppliances" },
        { icon: hardwareAppliancesAlt, key: "hardwareAppliancesAlt" },
        { icon: hardwareApplianceProfiles, key: "hardwareApplianceProfiles" },
        { icon: hardwareDesktopWindows, key: "hardwareDesktopWindows" },
        { icon: hardwareInstances, key: "hardwareInstances" },
        { icon: hardwareKeyboardArrowDown, key: "hardwareKeyboardArrowDown" },
        { icon: hardwareKeyboardArrowUp, key: "hardwareKeyboardArrowUp" },
        { icon: hardwareLaptop, key: "hardwareLaptop" },
        { icon: hardwareMinionProfiles, key: "hardwareMinionProfiles" },
        { icon: hardwareNetwork, key: "hardwareNetwork" },
        { icon: hardwareNetworkProfiles, key: "hardwareNetworkProfiles" },
        { icon: hardwareRouter, key: "hardwareRouter" },
        { icon: hardwareSecurity, key: "hardwareSecurity" },
        { icon: hardwareServer, key: "hardwareServer" },
        { icon: hardwareVirtualMachine, key: "hardwareVirtualMachine" },
        { icon: hardwareVirtualMachineAlt, key: "hardwareVirtualMachineAlt" },
        { icon: actionAccountCircle, key: "actionAccountCircle" },
        { icon: actionAdd, key: "actionAdd" },
        { icon: actionAddCircleAlt, key: "actionAddCircleAlt" },
        { icon: actionAddComment, key: "actionAddComment" },
        { icon: actionAddNote, key: "actionAddNote" },
        { icon: actionAddUser, key: "actionAddUser" },
        { icon: actionArchive, key: "actionArchive" },
        { icon: actionAssignTo, key: "actionAssignTo" },
        { icon: actionAttachEmail, key: "actionAttachEmail" },
        { icon: actionAttachFile, key: "actionAttachFile" },
        { icon: actionBuild, key: "actionBuild" },
        { icon: actionBusiness, key: "actionBusiness" },
        { icon: actionCalendar, key: "actionCalendar" },
        { icon: actionCalendarEndDate, key: "actionCalendarEndDate" },
        { icon: actionCalendarStartDate, key: "actionCalendarStartDate" },
        { icon: actionCancel, key: "actionCancel" },
        { icon: actionChangeOwner, key: "actionChangeOwner" },
        { icon: actionCheckCircle, key: "actionCheckCircle" },
        { icon: actionCloud, key: "actionCloud" },
        { icon: actionCloudDownload, key: "actionCloudDownload" },
        { icon: actionCloudUpload, key: "actionCloudUpload" },
        { icon: actionCode, key: "actionCode" },
        { icon: actionComment, key: "actionComment" },
        { icon: actionContactSupport, key: "actionContactSupport" },
        { icon: actionContentCopy, key: "actionContentCopy" },
        { icon: actionContentPaste, key: "actionContentPaste" },
        { icon: actionCycle, key: "actionCycle" },
        { icon: actionDashboard, key: "actionDashboard" },
        { icon: actionDateRange, key: "actionDateRange" },
        { icon: actionDelete, key: "actionDelete" },
        { icon: actionDownloadFile, key: "actionDownloadFile" },
        { icon: actionEdit, key: "actionEdit" },
        { icon: actionEditMode, key: "actionEditMode" },
        { icon: actionEmail, key: "actionEmail" },
        { icon: actionEmailDraft, key: "actionEmailDraft" },
        { icon: actionEmailInbox, key: "actionEmailInbox" },
        { icon: actionEmailSecure, key: "actionEmailSecure" },
        { icon: actionExitToApp, key: "actionExitToApp" },
        { icon: actionExpand, key: "actionExpand" },
        { icon: actionFeedback, key: "actionFeedback" },
        { icon: actionFeedbackAlt, key: "actionFeedbackAlt" },
        { icon: actionFileCopy, key: "actionFileCopy" },
        { icon: actionFilterAlt, key: "actionFilterAlt" },
        { icon: actionHelp, key: "actionHelp" },
        { icon: actionHide, key: "actionHide" },
        { icon: actionHome, key: "actionHome" },
        { icon: actionInfo, key: "actionInfo" },
        { icon: actionInformationExchange, key: "actionInformationExchange" },
        { icon: actionLightDarkMode, key: "actionLightDarkMode" },
        { icon: actionLink, key: "actionLink" },
        { icon: actionList, key: "actionList" },
        { icon: actionLocation, key: "actionLocation" },
        { icon: actionLocationCity, key: "actionLocationCity" },
        { icon: actionLock, key: "actionLock" },
        { icon: actionLockPasswordProtected, key: "actionLockPasswordProtected" },
        { icon: actionLoggerConfigs, key: "actionLoggerConfigs" },
        { icon: actionLogIn, key: "actionLogIn" },
        { icon: actionLogOut, key: "actionLogOut" },
        { icon: actionManageProfile, key: "actionManageProfile" },
        { icon: actionMarkComplete, key: "actionMarkComplete" },
        { icon: actionMarkIncomplete, key: "actionMarkIncomplete" },
        { icon: actionMarkRead, key: "actionMarkRead" },
        { icon: actionMarkUnread, key: "actionMarkUnread" },
        { icon: actionNotifications, key: "actionNotifications" },
        { icon: actionOptions, key: "actionOptions" },
        { icon: actionPerson, key: "actionPerson" },
        { icon: actionPin, key: "actionPin" },
        { icon: actionPlayCircle, key: "actionPlayCircle" },
        { icon: actionPrint, key: "actionPrint" },
        { icon: actionRemove, key: "actionRemove" },
        { icon: actionRemoveUser, key: "actionRemoveUser" },
        { icon: actionReporting, key: "actionReporting" },
        { icon: actionRestore, key: "actionRestore" },
        { icon: actionSearch, key: "actionSearch" },
        { icon: actionSend, key: "actionSend" },
        { icon: actionSendWorkflow, key: "actionSendWorkflow" },
        { icon: actionSettings, key: "actionSettings" },
        { icon: actionShare, key: "actionShare" },
        { icon: actionSort, key: "actionSort" },
        { icon: actionSubscriptions, key: "actionSubscriptions" },
        { icon: actionSupportCenter, key: "actionSupportCenter" },
        { icon: actionUnlock, key: "actionUnlock" },
        { icon: actionUpdateSchedules, key: "actionUpdateSchedules" },
        { icon: actionUpdateUtilities, key: "actionUpdateUtilities" },
        { icon: actionUploadFile, key: "actionUploadFile" },
        { icon: actionVerifedUser, key: "actionVerifedUser" },
        { icon: actionView, key: "actionView" },
        { icon: actionViewDetails, key: "actionViewDetails" },
        { icon: actionWorkflow, key: "actionWorkflow" },
        { icon: medicalAmbulance, key: "medicalAmbulance" },
        { icon: medicalCostSavings, key: "medicalCostSavings" },
        { icon: medicalDrug, key: "medicalDrug" },
        { icon: medicalDrugGroupId, key: "medicalDrugGroupId" },
        { icon: medicalHospital, key: "medicalHospital" },
        { icon: medicalPatient, key: "medicalPatient" },
        { icon: medicalPayor, key: "medicalPayor" },
        { icon: medicalProvider, key: "medicalProvider" },
        { icon: medicalProviderOffice, key: "medicalProviderOffice" },
        { icon: medicalTreatment, key: "medicalTreatment" },
        { icon: medicalTreatmentCycle, key: "medicalTreatmentCycle" },
        { icon: medicalTreatmentSchedule, key: "medicalTreatmentSchedule" },
        { icon: medicalVitals, key: "medicalVitals" },
        { icon: navigationApps, key: "navigationApps" },
        { icon: navigationAppsGetMore, key: "navigationAppsGetMore" },
        { icon: navigationArrowBack, key: "navigationArrowBack" },
        { icon: navigationArrowDropDown, key: "navigationArrowDropDown" },
        { icon: navigationCancel, key: "navigationCancel" },
        { icon: navigationChevronLeft, key: "navigationChevronLeft" },
        { icon: navigationChevronRight, key: "navigationChevronRight" },
        { icon: navigationExpandLess, key: "navigationExpandLess" },
        { icon: navigationExpandMore, key: "navigationExpandMore" },
        { icon: navigationFirstPage, key: "navigationFirstPage" },
        { icon: navigationFullscreen, key: "navigationFullscreen" },
        { icon: navigationFullscreenExit, key: "navigationFullscreenExit" },
        { icon: navigationGridView, key: "navigationGridView" },
        { icon: navigationLastPage, key: "navigationLastPage" },
        { icon: navigationMenu, key: "navigationMenu" },
        { icon: navigationMenuClose, key: "navigationMenuClose" },
        { icon: navigationMenuOpen, key: "navigationMenuOpen" },
        { icon: navigationMoreHoriz, key: "navigationMoreHoriz" },
        { icon: navigationMoreVert, key: "navigationMoreVert" },
        { icon: navigationRefresh, key: "navigationRefresh" },
        { icon: navigationSubdirectoryArrowLeft, key: "navigationSubdirectoryArrowLeft" },
        { icon: navigationSubdirectoryArrowRight, key: "navigationSubdirectoryArrowRight" },
        { icon: navigationUnfoldLess, key: "navigationUnfoldLess" },
        { icon: navigationUnfoldMore, key: "navigationUnfoldMore" },
        { icon: notificationConnected, key: "notificationConnected" },
        { icon: notificationError, key: "notificationError" },
        { icon: notificationUnconnected, key: "notificationUnconnected" },
        { icon: notificationWarning, key: "notificationWarning" },
        { icon: notificationWifi, key: "notificationWifi" },
        { icon: notificationWifiNoConnection, key: "notificationWifiNoConnection" },
        { icon: notificationWifiOff, key: "notificationWifiOff" },
        { icon: notificationWifiSignalBad, key: "notificationWifiSignalBad" },
        { icon: notificationWifiStatusBar, key: "notificationWifiStatusBar" }]
    };
  },
  components: {
    ...components
  }
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.icons {
  font-size: 1.25rem;
  color: var($primary);
  svg {
    margin: 0.75rem;
  }
}
</style>
