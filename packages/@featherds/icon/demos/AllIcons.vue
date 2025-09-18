
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
import accountGroup from "@featherds/icon/account/Group";

import communicationCertificate from "@featherds/icon/communication/Certificate";

import communicationCertificateAlt from "@featherds/icon/communication/CertificateAlt";

import communicationChat from "@featherds/icon/communication/Chat";

import communicationContacts from "@featherds/icon/communication/Contacts";

import communicationDocumentation from "@featherds/icon/communication/Documentation";

import communicationIdCard from "@featherds/icon/communication/IdCard";

import communicationPhone from "@featherds/icon/communication/Phone";

import contentBlogArticle from "@featherds/icon/content/BlogArticle";

import contentVideo from "@featherds/icon/content/Video";

import datavisAreaChart from "@featherds/icon/datavis/AreaChart";

import datavisBarChart from "@featherds/icon/datavis/BarChart";

import datavisColumnChart from "@featherds/icon/datavis/ColumnChart";

import datavisDonutChart from "@featherds/icon/datavis/DonutChart";

import datavisGauge from "@featherds/icon/datavis/Gauge";

import datavisLineChart from "@featherds/icon/datavis/LineChart";

import datavisPieChart from "@featherds/icon/datavis/PieChart";

import datavisPolarChart from "@featherds/icon/datavis/PolarChart";

import datavisReporting from "@featherds/icon/datavis/Reporting";

import datavisStackedBarChart from "@featherds/icon/datavis/StackedBarChart";

import datavisStackedColumnChart from "@featherds/icon/datavis/StackedColumnChart";

import datavisTreeDiagram from "@featherds/icon/datavis/TreeDiagram";

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

import actionGroup from "@featherds/icon/action/Group";

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

import notificationConnected from "@featherds/icon/notification/Connected";

import notificationError from "@featherds/icon/notification/Error";

import notificationNotificationsOff from "@featherds/icon/notification/NotificationsOff";

import notificationNotificationSelected from "@featherds/icon/notification/NotificationSelected";

import notificationNotificationSoundSelected from "@featherds/icon/notification/NotificationSoundSelected";

import notificationUnconnected from "@featherds/icon/notification/Unconnected";

import notificationWarning from "@featherds/icon/notification/Warning";

import notificationWifi from "@featherds/icon/notification/Wifi";

import notificationWifiNoConnection from "@featherds/icon/notification/WifiNoConnection";

import notificationWifiOff from "@featherds/icon/notification/WifiOff";

import notificationWifiSignalBad from "@featherds/icon/notification/WifiSignalBad";

import notificationWifiStatusBar from "@featherds/icon/notification/WifiStatusBar";

import networkAggregationLayer from "@featherds/icon/network/AggregationLayer";

import networkAggregationLayerAlt1 from "@featherds/icon/network/AggregationLayerAlt1";

import networkAggregationLayerAlt2 from "@featherds/icon/network/AggregationLayerAlt2";

import networkAggregationLayerAlt3 from "@featherds/icon/network/AggregationLayerAlt3";

import networkAggregationLayerAlt4 from "@featherds/icon/network/AggregationLayerAlt4";

import networkAggregationLayerAlt5 from "@featherds/icon/network/AggregationLayerAlt5";

import networkApiConfig from "@featherds/icon/network/ApiConfig";

import networkApiEndpoints from "@featherds/icon/network/ApiEndpoints";

import networkAppliances from "@featherds/icon/network/Appliances";

import networkAppliancesAlt from "@featherds/icon/network/AppliancesAlt";

import networkApplianceProfiles from "@featherds/icon/network/ApplianceProfiles";

import networkBuild from "@featherds/icon/network/Build";

import networkCertificateAlt from "@featherds/icon/network/CertificateAlt";

import networkCloud from "@featherds/icon/network/Cloud";

import networkCloudBackUp from "@featherds/icon/network/CloudBackUp";

import networkCloudDownload from "@featherds/icon/network/CloudDownload";

import networkCloudService from "@featherds/icon/network/CloudService";

import networkCloudUpload from "@featherds/icon/network/CloudUpload";

import networkCode from "@featherds/icon/network/Code";

import networkCompare from "@featherds/icon/network/Compare";

import networkCompare1 from "@featherds/icon/network/Compare1";

import networkCompliance from "@featherds/icon/network/Compliance";

import networkConfiguration from "@featherds/icon/network/Configuration";

import networkConnection from "@featherds/icon/network/Connection";

import networkContainerAdd from "@featherds/icon/network/ContainerAdd";

import networkContainerTransient from "@featherds/icon/network/ContainerTransient";

import networkContainerUnknown from "@featherds/icon/network/ContainerUnknown";

import networkDatabase from "@featherds/icon/network/Database";

import networkDesktop from "@featherds/icon/network/Desktop";

import networkDigitize from "@featherds/icon/network/Digitize";

import networkDistributedMonitoring from "@featherds/icon/network/DistributedMonitoring";

import networkElectricalServices from "@featherds/icon/network/ElectricalServices";

import networkEndUser from "@featherds/icon/network/EndUser";

import networkExitCompare from "@featherds/icon/network/ExitCompare";

import networkExitCompareModeAlt from "@featherds/icon/network/ExitCompareModeAlt";

import networkExtractData from "@featherds/icon/network/ExtractData";

import networkFirewall from "@featherds/icon/network/Firewall";

import networkInstances from "@featherds/icon/network/Instances";

import networkInventory from "@featherds/icon/network/Inventory";

import networkInventoryAdd from "@featherds/icon/network/InventoryAdd";

import networkInventoryAlt from "@featherds/icon/network/InventoryAlt";

import networkInventoryConfirm from "@featherds/icon/network/InventoryConfirm";

import networkInventoryDelete from "@featherds/icon/network/InventoryDelete";

import networkLaptop from "@featherds/icon/network/Laptop";

import networkLoggerConfigs from "@featherds/icon/network/LoggerConfigs";

import networkLogs from "@featherds/icon/network/Logs";

import networkLogsAlt from "@featherds/icon/network/LogsAlt";

import networkLogFile from "@featherds/icon/network/LogFile";

import networkMicroservices from "@featherds/icon/network/Microservices";

import networkMinion from "@featherds/icon/network/Minion";

import networkMinionProfiles from "@featherds/icon/network/MinionProfiles";

import networkMonitoring from "@featherds/icon/network/Monitoring";

import networkNetworkProfiles from "@featherds/icon/network/NetworkProfiles";

import networkNodes from "@featherds/icon/network/Nodes";

import networkPolicy from "@featherds/icon/network/Policy";

import networkPower from "@featherds/icon/network/Power";

import networkRouterLan from "@featherds/icon/network/RouterLan";

import networkRouterWan from "@featherds/icon/network/RouterWan";

import networkSecurity from "@featherds/icon/network/Security";

import networkSecurityScan from "@featherds/icon/network/SecurityScan";

import networkServer from "@featherds/icon/network/Server";

import networkServerClock from "@featherds/icon/network/ServerClock";

import networkSwitch from "@featherds/icon/network/Switch";

import networkTerminal from "@featherds/icon/network/Terminal";

import networkUpdateUtilities from "@featherds/icon/network/UpdateUtilities";

import networkUtilities from "@featherds/icon/network/Utilities";

import networkViewCode from "@featherds/icon/network/ViewCode";

import networkVirtualMachine from "@featherds/icon/network/VirtualMachine";

import networkVirtualMachineAlt from "@featherds/icon/network/VirtualMachineAlt";

import networkVirtualMachineAlt2 from "@featherds/icon/network/VirtualMachineAlt2";

import networkWifiRouter from "@featherds/icon/network/WifiRouter";

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



export default {
  data(){
    return {
      featherIcons:[{ icon: accountGroup, key: "accountGroup" },
        { icon: communicationCertificate, key: "communicationCertificate" },
        { icon: communicationCertificateAlt, key: "communicationCertificateAlt" },
        { icon: communicationChat, key: "communicationChat" },
        { icon: communicationContacts, key: "communicationContacts" },
        { icon: communicationDocumentation, key: "communicationDocumentation" },
        { icon: communicationIdCard, key: "communicationIdCard" },
        { icon: communicationPhone, key: "communicationPhone" },
        { icon: contentBlogArticle, key: "contentBlogArticle" },
        { icon: contentVideo, key: "contentVideo" },
        { icon: datavisAreaChart, key: "datavisAreaChart" },
        { icon: datavisBarChart, key: "datavisBarChart" },
        { icon: datavisColumnChart, key: "datavisColumnChart" },
        { icon: datavisDonutChart, key: "datavisDonutChart" },
        { icon: datavisGauge, key: "datavisGauge" },
        { icon: datavisLineChart, key: "datavisLineChart" },
        { icon: datavisPieChart, key: "datavisPieChart" },
        { icon: datavisPolarChart, key: "datavisPolarChart" },
        { icon: datavisReporting, key: "datavisReporting" },
        { icon: datavisStackedBarChart, key: "datavisStackedBarChart" },
        { icon: datavisStackedColumnChart, key: "datavisStackedColumnChart" },
        { icon: datavisTreeDiagram, key: "datavisTreeDiagram" },
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
        { icon: actionGroup, key: "actionGroup" },
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
        { icon: notificationConnected, key: "notificationConnected" },
        { icon: notificationError, key: "notificationError" },
        { icon: notificationNotificationsOff, key: "notificationNotificationsOff" },
        { icon: notificationNotificationSelected, key: "notificationNotificationSelected" },
        { icon: notificationNotificationSoundSelected, key: "notificationNotificationSoundSelected" },
        { icon: notificationUnconnected, key: "notificationUnconnected" },
        { icon: notificationWarning, key: "notificationWarning" },
        { icon: notificationWifi, key: "notificationWifi" },
        { icon: notificationWifiNoConnection, key: "notificationWifiNoConnection" },
        { icon: notificationWifiOff, key: "notificationWifiOff" },
        { icon: notificationWifiSignalBad, key: "notificationWifiSignalBad" },
        { icon: notificationWifiStatusBar, key: "notificationWifiStatusBar" },
        { icon: networkAggregationLayer, key: "networkAggregationLayer" },
        { icon: networkAggregationLayerAlt1, key: "networkAggregationLayerAlt1" },
        { icon: networkAggregationLayerAlt2, key: "networkAggregationLayerAlt2" },
        { icon: networkAggregationLayerAlt3, key: "networkAggregationLayerAlt3" },
        { icon: networkAggregationLayerAlt4, key: "networkAggregationLayerAlt4" },
        { icon: networkAggregationLayerAlt5, key: "networkAggregationLayerAlt5" },
        { icon: networkApiConfig, key: "networkApiConfig" },
        { icon: networkApiEndpoints, key: "networkApiEndpoints" },
        { icon: networkAppliances, key: "networkAppliances" },
        { icon: networkAppliancesAlt, key: "networkAppliancesAlt" },
        { icon: networkApplianceProfiles, key: "networkApplianceProfiles" },
        { icon: networkBuild, key: "networkBuild" },
        { icon: networkCertificateAlt, key: "networkCertificateAlt" },
        { icon: networkCloud, key: "networkCloud" },
        { icon: networkCloudBackUp, key: "networkCloudBackUp" },
        { icon: networkCloudDownload, key: "networkCloudDownload" },
        { icon: networkCloudService, key: "networkCloudService" },
        { icon: networkCloudUpload, key: "networkCloudUpload" },
        { icon: networkCode, key: "networkCode" },
        { icon: networkCompare, key: "networkCompare" },
        { icon: networkCompare1, key: "networkCompare1" },
        { icon: networkCompliance, key: "networkCompliance" },
        { icon: networkConfiguration, key: "networkConfiguration" },
        { icon: networkConnection, key: "networkConnection" },
        { icon: networkContainerAdd, key: "networkContainerAdd" },
        { icon: networkContainerTransient, key: "networkContainerTransient" },
        { icon: networkContainerUnknown, key: "networkContainerUnknown" },
        { icon: networkDatabase, key: "networkDatabase" },
        { icon: networkDesktop, key: "networkDesktop" },
        { icon: networkDigitize, key: "networkDigitize" },
        { icon: networkDistributedMonitoring, key: "networkDistributedMonitoring" },
        { icon: networkElectricalServices, key: "networkElectricalServices" },
        { icon: networkEndUser, key: "networkEndUser" },
        { icon: networkExitCompare, key: "networkExitCompare" },
        { icon: networkExitCompareModeAlt, key: "networkExitCompareModeAlt" },
        { icon: networkExtractData, key: "networkExtractData" },
        { icon: networkFirewall, key: "networkFirewall" },
        { icon: networkInstances, key: "networkInstances" },
        { icon: networkInventory, key: "networkInventory" },
        { icon: networkInventoryAdd, key: "networkInventoryAdd" },
        { icon: networkInventoryAlt, key: "networkInventoryAlt" },
        { icon: networkInventoryConfirm, key: "networkInventoryConfirm" },
        { icon: networkInventoryDelete, key: "networkInventoryDelete" },
        { icon: networkLaptop, key: "networkLaptop" },
        { icon: networkLoggerConfigs, key: "networkLoggerConfigs" },
        { icon: networkLogs, key: "networkLogs" },
        { icon: networkLogsAlt, key: "networkLogsAlt" },
        { icon: networkLogFile, key: "networkLogFile" },
        { icon: networkMicroservices, key: "networkMicroservices" },
        { icon: networkMinion, key: "networkMinion" },
        { icon: networkMinionProfiles, key: "networkMinionProfiles" },
        { icon: networkMonitoring, key: "networkMonitoring" },
        { icon: networkNetworkProfiles, key: "networkNetworkProfiles" },
        { icon: networkNodes, key: "networkNodes" },
        { icon: networkPolicy, key: "networkPolicy" },
        { icon: networkPower, key: "networkPower" },
        { icon: networkRouterLan, key: "networkRouterLan" },
        { icon: networkRouterWan, key: "networkRouterWan" },
        { icon: networkSecurity, key: "networkSecurity" },
        { icon: networkSecurityScan, key: "networkSecurityScan" },
        { icon: networkServer, key: "networkServer" },
        { icon: networkServerClock, key: "networkServerClock" },
        { icon: networkSwitch, key: "networkSwitch" },
        { icon: networkTerminal, key: "networkTerminal" },
        { icon: networkUpdateUtilities, key: "networkUpdateUtilities" },
        { icon: networkUtilities, key: "networkUtilities" },
        { icon: networkViewCode, key: "networkViewCode" },
        { icon: networkVirtualMachine, key: "networkVirtualMachine" },
        { icon: networkVirtualMachineAlt, key: "networkVirtualMachineAlt" },
        { icon: networkVirtualMachineAlt2, key: "networkVirtualMachineAlt2" },
        { icon: networkWifiRouter, key: "networkWifiRouter" },
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
        { icon: navigationUnfoldMore, key: "navigationUnfoldMore" }]
    };
  },
  components: {
    ...components
  }
};
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.icons {
  font-size: 1.25rem;
  color: var(vars.$shade-1);
  svg {
    margin: 0.75rem;
  }
}
</style>
