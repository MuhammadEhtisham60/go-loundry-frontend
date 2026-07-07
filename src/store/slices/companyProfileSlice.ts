import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyProfileState {
  companyName: string | null;
  contactEmail: string | null;
  website: string | null;
  phoneNumber: string | null;
  address: string | null;
  fullLogoUrl: string | null;
  iconLogoUrl: string | null;
  brandColorStart: string | null;
  brandColorEnd: string | null;
  brandGradientCSS: string | null;
  brandGradientEnabled: boolean;
  sidebarBackground: string | null;
  sidebarText: string | null;
  isLoaded: boolean;
}

const initialState: CompanyProfileState = {
  companyName: null,
  contactEmail: null,
  website: null,
  phoneNumber: null,
  address: null,
  fullLogoUrl: null,
  iconLogoUrl: null,
  brandColorStart: null,
  brandColorEnd: null,
  brandGradientCSS: null,
  brandGradientEnabled: false,
  sidebarBackground: null,
  sidebarText: null,
  isLoaded: false,
};

const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    setCompanyProfile(state, action: PayloadAction<Record<string, unknown>>) {
      const d = action.payload;
      state.companyName = (d.company_name as string) || null;
      state.contactEmail = (d.contact_email as string) || null;
      state.website = (d.website as string) || null;
      state.phoneNumber = (d.phone_number as string) || null;
      state.address = (d.address as string) || null;
      state.fullLogoUrl = (d.full_logo_url as string) || null;
      state.iconLogoUrl = (d.icon_logo_url as string) || null;
      state.brandColorStart = (d.brand_color_start as string) || null;
      state.brandColorEnd = (d.brand_color_end as string) || null;
      state.brandGradientCSS =
        d.brand_color_start && d.brand_color_end
          ? `linear-gradient(${d.brand_color_start as string}, ${d.brand_color_end as string})`
          : null;
      state.brandGradientEnabled = (d.brand_gradient_enabled as boolean) ?? false;
      state.sidebarBackground = (d.sidebar_background as string) || null;
      state.sidebarText = (d.sidebar_text as string) || null;
      state.isLoaded = true;
    },
    clearCompanyProfile() {
      return initialState;
    },
  },
});

export const { setCompanyProfile, clearCompanyProfile } = companyProfileSlice.actions;

// Selectors
export const selectCompanyProfile = (state: { companyProfile: CompanyProfileState }) =>
  state.companyProfile;

export const selectBrandColors = (state: { companyProfile: CompanyProfileState }) => ({
  start: state.companyProfile.brandColorStart,
  end: state.companyProfile.brandColorEnd,
  gradientCSS: state.companyProfile.brandGradientCSS,
  gradientEnabled: state.companyProfile.brandGradientEnabled,
});

export const selectSidebarColors = (state: { companyProfile: CompanyProfileState }) => ({
  background: state.companyProfile.sidebarBackground,
  text: state.companyProfile.sidebarText,
});

export default companyProfileSlice.reducer;
