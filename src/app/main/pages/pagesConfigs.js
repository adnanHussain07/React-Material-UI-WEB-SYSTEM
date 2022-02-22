import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import ResetSentConfig from './auth/reset-mail-sent/ResetSentConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import CompactInvoicePageConfig from './invoices/compact/CompactInvoicePageConfig';
import ModernInvoicePageConfig from './invoices/modern/ModernInvoicePageConfig';
import MaintenancePageConfig from './maintenance/MaintenancePageConfig';
import PricingStyle1PageConfig from './pricing/style-1/PricingStyle1PageConfig';
import PricingStyle2PageConfig from './pricing/style-2/PricingStyle2PageConfig';
import PricingStyle3PageConfig from './pricing/style-3/PricingStyle3PageConfig';
import ProfilePageConfig from './profile/ProfilePageConfig';
import ClassicSearchPageConfig from './search/classic/ClassicSearchPageConfig';
import ModernSearchPageConfig from './search/modern/ModernSearchPageConfig';
import MyComputerConfig from './MyComputer/MyComputerConfig';
import SchedulesConfig from './Schedules/SchedulesConfig';
import InvitesConfig from './Invites/InvitesConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';

const pagesConfigs = [
  ResetPasswordPageConfig,
  ForgotPasswordPageConfig,
  MailConfirmPageConfig,
  ResetSentConfig,
  MaintenancePageConfig,
  ModernInvoicePageConfig,
  CompactInvoicePageConfig,
  PricingStyle1PageConfig,
  PricingStyle2PageConfig,
  PricingStyle3PageConfig,
  ProfilePageConfig,
  ClassicSearchPageConfig,
  ModernSearchPageConfig,
  Error404PageConfig,
  Error500PageConfig,
  MyComputerConfig,
  InvitesConfig,
  SchedulesConfig,
];

export default pagesConfigs;
