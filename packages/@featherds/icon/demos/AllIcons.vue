
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
import alertError from "@featherds/icon/alert/Error";

import alertWarning from "@featherds/icon/alert/Warning";

import communicationCall from "@featherds/icon/communication/Call";

import communicationChat from "@featherds/icon/communication/Chat";

import communicationEmail from "@featherds/icon/communication/Email";

import communicationFax from "@featherds/icon/communication/Fax";

import communicationPhone from "@featherds/icon/communication/Phone";

import actionsAccount from "@featherds/icon/actions/Account";

import actionsAccountCircle from "@featherds/icon/actions/AccountCircle";

import actionsAdd from "@featherds/icon/actions/Add";

import actionsAddComment from "@featherds/icon/actions/AddComment";

import actionsAddNote from "@featherds/icon/actions/AddNote";

import actionsApprovals from "@featherds/icon/actions/Approvals";

import actionsArchive from "@featherds/icon/actions/Archive";

import actionsAssignTo from "@featherds/icon/actions/AssignTo";

import actionsAttachment from "@featherds/icon/actions/Attachment";

import actionsBuild from "@featherds/icon/actions/Build";

import actionsBusiness from "@featherds/icon/actions/Business";

import actionsCalendar from "@featherds/icon/actions/Calendar";

import actionsCancel from "@featherds/icon/actions/Cancel";

import actionsChangeOwner from "@featherds/icon/actions/ChangeOwner";

import actionsChangePassword from "@featherds/icon/actions/ChangePassword";

import actionsCheckCircle from "@featherds/icon/actions/CheckCircle";

import actionsClock from "@featherds/icon/actions/Clock";

import actionsCode from "@featherds/icon/actions/Code";

import actionsComment from "@featherds/icon/actions/Comment";

import actionsContentCopy from "@featherds/icon/actions/ContentCopy";

import actionsContentPaste from "@featherds/icon/actions/ContentPaste";

import actionsCostSavings from "@featherds/icon/actions/CostSavings";

import actionsDelete from "@featherds/icon/actions/Delete";

import actionsDone from "@featherds/icon/actions/Done";

import actionsDoneCircle from "@featherds/icon/actions/DoneCircle";

import actionsDownload from "@featherds/icon/actions/Download";

import actionsDownloadDocument from "@featherds/icon/actions/DownloadDocument";

import actionsDownloadFile from "@featherds/icon/actions/DownloadFile";

import actionsEdit from "@featherds/icon/actions/Edit";

import actionsEndDate from "@featherds/icon/actions/EndDate";

import actionsExitToApp from "@featherds/icon/actions/ExitToApp";

import actionsExpand from "@featherds/icon/actions/Expand";

import actionsFilter from "@featherds/icon/actions/Filter";

import actionsHelp from "@featherds/icon/actions/Help";

import actionsHelpWebsite from "@featherds/icon/actions/HelpWebsite";

import actionsIdCard from "@featherds/icon/actions/IdCard";

import actionsInfo from "@featherds/icon/actions/Info";

import actionsLocation from "@featherds/icon/actions/Location";

import actionsLock from "@featherds/icon/actions/Lock";

import actionsOptions from "@featherds/icon/actions/Options";

import actionsPerson from "@featherds/icon/actions/Person";

import actionsPin from "@featherds/icon/actions/Pin";

import actionsPrint from "@featherds/icon/actions/Print";

import actionsProfile from "@featherds/icon/actions/Profile";

import actionsRemove from "@featherds/icon/actions/Remove";

import actionsRestore from "@featherds/icon/actions/Restore";

import actionsReviewComplete from "@featherds/icon/actions/ReviewComplete";

import actionsReviewerS from "@featherds/icon/actions/ReviewerS";

import actionsReviewReason from "@featherds/icon/actions/ReviewReason";

import actionsSchedule from "@featherds/icon/actions/Schedule";

import actionsSearch from "@featherds/icon/actions/Search";

import actionsSecurity from "@featherds/icon/actions/Security";

import actionsSettings from "@featherds/icon/actions/Settings";

import actionsSignOut from "@featherds/icon/actions/SignOut";

import actionsStartDate from "@featherds/icon/actions/StartDate";

import actionsSubmissions from "@featherds/icon/actions/Submissions";

import actionsTrash from "@featherds/icon/actions/Trash";

import actionsUnpinned from "@featherds/icon/actions/Unpinned";

import actionsUploadFile from "@featherds/icon/actions/UploadFile";

import actionsVerifedUser from "@featherds/icon/actions/VerifedUser";

import actionsViewDetails from "@featherds/icon/actions/ViewDetails";

import actionsVisibility from "@featherds/icon/actions/Visibility";

import actionsVisibilityOff from "@featherds/icon/actions/VisibilityOff";

import fileFolderOpen from "@featherds/icon/file/FolderOpen";

import hardwareDesktopWindows from "@featherds/icon/hardware/DesktopWindows";

import hardwareKeyboardArrowDown from "@featherds/icon/hardware/KeyboardArrowDown";

import hardwareSecurity from "@featherds/icon/hardware/Security";

import medicalAddTemp from "@featherds/icon/medical/AddTemp";

import medicalDiagnosis from "@featherds/icon/medical/Diagnosis";

import medicalDrug from "@featherds/icon/medical/Drug";

import medicalDrugGroupId from "@featherds/icon/medical/DrugGroupId";

import medicalJustificationQuestions from "@featherds/icon/medical/JustificationQuestions";

import medicalLineOfBusiness from "@featherds/icon/medical/LineOfBusiness";

import medicalPatient from "@featherds/icon/medical/Patient";

import medicalPayer from "@featherds/icon/medical/Payer";

import medicalProvider from "@featherds/icon/medical/Provider";

import medicalRegimen from "@featherds/icon/medical/Regimen";

import medicalSiteOfService from "@featherds/icon/medical/SiteOfService";

import medicalTreatment from "@featherds/icon/medical/Treatment";

import medicalTreatmentSchedule from "@featherds/icon/medical/TreatmentSchedule";

import medicalTreatmentStatus from "@featherds/icon/medical/TreatmentStatus";

import medicalTreeChild from "@featherds/icon/medical/TreeChild";

import medicalWorkflowStates from "@featherds/icon/medical/WorkflowStates";

import navigationArrowBack from "@featherds/icon/navigation/ArrowBack";

import navigationCancel from "@featherds/icon/navigation/Cancel";

import navigationChevronRight from "@featherds/icon/navigation/ChevronRight";

import navigationClose from "@featherds/icon/navigation/Close";

import navigationDownChevron from "@featherds/icon/navigation/DownChevron";

import navigationDropDownArrow from "@featherds/icon/navigation/DropDownArrow";

import navigationExpandLess from "@featherds/icon/navigation/ExpandLess";

import navigationExpandMore from "@featherds/icon/navigation/ExpandMore";

import navigationFirstPage from "@featherds/icon/navigation/FirstPage";

import navigationFullscreen from "@featherds/icon/navigation/Fullscreen";

import navigationFullscreenExit from "@featherds/icon/navigation/FullscreenExit";

import navigationLastPage from "@featherds/icon/navigation/LastPage";

import navigationLeftChevron from "@featherds/icon/navigation/LeftChevron";

import navigationMoreHoriz from "@featherds/icon/navigation/MoreHoriz";

import navigationMoreVert from "@featherds/icon/navigation/MoreVert";

import navigationMoreVertical from "@featherds/icon/navigation/MoreVertical";

import navigationRightArrow from "@featherds/icon/navigation/RightArrow";

import navigationRightChevron from "@featherds/icon/navigation/RightChevron";

import navigationSearch from "@featherds/icon/navigation/Search";

import navigationUnfoldMore from "@featherds/icon/navigation/UnfoldMore";

import navigationUpChevron from "@featherds/icon/navigation/UpChevron";

import notificationsAlert from "@featherds/icon/notifications/Alert";

import notificationsErrorOutline from "@featherds/icon/notifications/ErrorOutline";

import notificationsNotifications from "@featherds/icon/notifications/Notifications";

import notificationsWarning from "@featherds/icon/notifications/Warning";

import statusAvailable from "@featherds/icon/status/Available";

import statusUnavailable from "@featherds/icon/status/Unavailable";



export default {
  data(){
    return {
      featherIcons:[{ icon: alertError, key: "alertError" },
        { icon: alertWarning, key: "alertWarning" },
        { icon: communicationCall, key: "communicationCall" },
        { icon: communicationChat, key: "communicationChat" },
        { icon: communicationEmail, key: "communicationEmail" },
        { icon: communicationFax, key: "communicationFax" },
        { icon: communicationPhone, key: "communicationPhone" },
        { icon: actionsAccount, key: "actionsAccount" },
        { icon: actionsAccountCircle, key: "actionsAccountCircle" },
        { icon: actionsAdd, key: "actionsAdd" },
        { icon: actionsAddComment, key: "actionsAddComment" },
        { icon: actionsAddNote, key: "actionsAddNote" },
        { icon: actionsApprovals, key: "actionsApprovals" },
        { icon: actionsArchive, key: "actionsArchive" },
        { icon: actionsAssignTo, key: "actionsAssignTo" },
        { icon: actionsAttachment, key: "actionsAttachment" },
        { icon: actionsBuild, key: "actionsBuild" },
        { icon: actionsBusiness, key: "actionsBusiness" },
        { icon: actionsCalendar, key: "actionsCalendar" },
        { icon: actionsCancel, key: "actionsCancel" },
        { icon: actionsChangeOwner, key: "actionsChangeOwner" },
        { icon: actionsChangePassword, key: "actionsChangePassword" },
        { icon: actionsCheckCircle, key: "actionsCheckCircle" },
        { icon: actionsClock, key: "actionsClock" },
        { icon: actionsCode, key: "actionsCode" },
        { icon: actionsComment, key: "actionsComment" },
        { icon: actionsContentCopy, key: "actionsContentCopy" },
        { icon: actionsContentPaste, key: "actionsContentPaste" },
        { icon: actionsCostSavings, key: "actionsCostSavings" },
        { icon: actionsDelete, key: "actionsDelete" },
        { icon: actionsDone, key: "actionsDone" },
        { icon: actionsDoneCircle, key: "actionsDoneCircle" },
        { icon: actionsDownload, key: "actionsDownload" },
        { icon: actionsDownloadDocument, key: "actionsDownloadDocument" },
        { icon: actionsDownloadFile, key: "actionsDownloadFile" },
        { icon: actionsEdit, key: "actionsEdit" },
        { icon: actionsEndDate, key: "actionsEndDate" },
        { icon: actionsExitToApp, key: "actionsExitToApp" },
        { icon: actionsExpand, key: "actionsExpand" },
        { icon: actionsFilter, key: "actionsFilter" },
        { icon: actionsHelp, key: "actionsHelp" },
        { icon: actionsHelpWebsite, key: "actionsHelpWebsite" },
        { icon: actionsIdCard, key: "actionsIdCard" },
        { icon: actionsInfo, key: "actionsInfo" },
        { icon: actionsLocation, key: "actionsLocation" },
        { icon: actionsLock, key: "actionsLock" },
        { icon: actionsOptions, key: "actionsOptions" },
        { icon: actionsPerson, key: "actionsPerson" },
        { icon: actionsPin, key: "actionsPin" },
        { icon: actionsPrint, key: "actionsPrint" },
        { icon: actionsProfile, key: "actionsProfile" },
        { icon: actionsRemove, key: "actionsRemove" },
        { icon: actionsRestore, key: "actionsRestore" },
        { icon: actionsReviewComplete, key: "actionsReviewComplete" },
        { icon: actionsReviewerS, key: "actionsReviewerS" },
        { icon: actionsReviewReason, key: "actionsReviewReason" },
        { icon: actionsSchedule, key: "actionsSchedule" },
        { icon: actionsSearch, key: "actionsSearch" },
        { icon: actionsSecurity, key: "actionsSecurity" },
        { icon: actionsSettings, key: "actionsSettings" },
        { icon: actionsSignOut, key: "actionsSignOut" },
        { icon: actionsStartDate, key: "actionsStartDate" },
        { icon: actionsSubmissions, key: "actionsSubmissions" },
        { icon: actionsTrash, key: "actionsTrash" },
        { icon: actionsUnpinned, key: "actionsUnpinned" },
        { icon: actionsUploadFile, key: "actionsUploadFile" },
        { icon: actionsVerifedUser, key: "actionsVerifedUser" },
        { icon: actionsViewDetails, key: "actionsViewDetails" },
        { icon: actionsVisibility, key: "actionsVisibility" },
        { icon: actionsVisibilityOff, key: "actionsVisibilityOff" },
        { icon: fileFolderOpen, key: "fileFolderOpen" },
        { icon: hardwareDesktopWindows, key: "hardwareDesktopWindows" },
        { icon: hardwareKeyboardArrowDown, key: "hardwareKeyboardArrowDown" },
        { icon: hardwareSecurity, key: "hardwareSecurity" },
        { icon: medicalAddTemp, key: "medicalAddTemp" },
        { icon: medicalDiagnosis, key: "medicalDiagnosis" },
        { icon: medicalDrug, key: "medicalDrug" },
        { icon: medicalDrugGroupId, key: "medicalDrugGroupId" },
        { icon: medicalJustificationQuestions, key: "medicalJustificationQuestions" },
        { icon: medicalLineOfBusiness, key: "medicalLineOfBusiness" },
        { icon: medicalPatient, key: "medicalPatient" },
        { icon: medicalPayer, key: "medicalPayer" },
        { icon: medicalProvider, key: "medicalProvider" },
        { icon: medicalRegimen, key: "medicalRegimen" },
        { icon: medicalSiteOfService, key: "medicalSiteOfService" },
        { icon: medicalTreatment, key: "medicalTreatment" },
        { icon: medicalTreatmentSchedule, key: "medicalTreatmentSchedule" },
        { icon: medicalTreatmentStatus, key: "medicalTreatmentStatus" },
        { icon: medicalTreeChild, key: "medicalTreeChild" },
        { icon: medicalWorkflowStates, key: "medicalWorkflowStates" },
        { icon: navigationArrowBack, key: "navigationArrowBack" },
        { icon: navigationCancel, key: "navigationCancel" },
        { icon: navigationChevronRight, key: "navigationChevronRight" },
        { icon: navigationClose, key: "navigationClose" },
        { icon: navigationDownChevron, key: "navigationDownChevron" },
        { icon: navigationDropDownArrow, key: "navigationDropDownArrow" },
        { icon: navigationExpandLess, key: "navigationExpandLess" },
        { icon: navigationExpandMore, key: "navigationExpandMore" },
        { icon: navigationFirstPage, key: "navigationFirstPage" },
        { icon: navigationFullscreen, key: "navigationFullscreen" },
        { icon: navigationFullscreenExit, key: "navigationFullscreenExit" },
        { icon: navigationLastPage, key: "navigationLastPage" },
        { icon: navigationLeftChevron, key: "navigationLeftChevron" },
        { icon: navigationMoreHoriz, key: "navigationMoreHoriz" },
        { icon: navigationMoreVert, key: "navigationMoreVert" },
        { icon: navigationMoreVertical, key: "navigationMoreVertical" },
        { icon: navigationRightArrow, key: "navigationRightArrow" },
        { icon: navigationRightChevron, key: "navigationRightChevron" },
        { icon: navigationSearch, key: "navigationSearch" },
        { icon: navigationUnfoldMore, key: "navigationUnfoldMore" },
        { icon: navigationUpChevron, key: "navigationUpChevron" },
        { icon: notificationsAlert, key: "notificationsAlert" },
        { icon: notificationsErrorOutline, key: "notificationsErrorOutline" },
        { icon: notificationsNotifications, key: "notificationsNotifications" },
        { icon: notificationsWarning, key: "notificationsWarning" },
        { icon: statusAvailable, key: "statusAvailable" },
        { icon: statusUnavailable, key: "statusUnavailable" }]
    };
  },
  components: {
    ...components
  }
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.icons {
  font-size: 20px;
  color: var($primary);
  svg {
    margin: 12px;
  }
}
</style>
