enum Role {
  User = 'User',
  Sales = 'Sales',
  HeadOf50 = 'Head of 50', // "50 boshi" translated as Head of 50, assuming it's a leadership role over 50 people or 50 units
  TicketAgent = 'Ticket Agent', // "Biletchi" implies a person who handles ticketing
  VisaOfficer = 'Visa Officer', // "Visachi" suggests a role related to handling visas
  Reporter = 'Reporter', // "Xabar oluvchi" can be translated as a Reporter or Informer, depending on the context within the company
  MasterManager = 'Master Manager', // "Master Manager" seems to be a direct translation
  Cashier = 'Cashier', // "Kassir" is straightforward as Cashier
  Accountant = 'Accountant', // "Bugalter" translates to Accountant
  BranchManager = 'Branch Manager', // "Filial Manager" is equivalent to Branch Manager,
  RegisteredUser = 'Registered User', // For users who have registered but don't have any access yet
}

export default Role;
