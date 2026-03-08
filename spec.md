# TrustCap Platform

## Current State
- Landing page, Auth page, Dashboard page, Profile page all exist
- Dashboard has a marquee showing all market indices (NIFTY 50, SENSEX, NIFTY BANK, NIFTY IT, etc.) with scrolling animation
- Logo is a generated image at `/assets/generated/trustcap-logo-transparent.dim_120x120.png` used in navbar, hero, footer, and modal
- Marquee items are clickable but do not navigate anywhere
- No "Show Details" button on marquee items
- No dedicated index detail pages

## Requested Changes (Diff)

### Add
- Replace the generated logo image with the uploaded image `/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg` everywhere the logo appears (navbar, hero, footer, modal) -- use as `<img>` with appropriate sizing
- Add a "Show Details" button/link on each marquee item (for NIFTY 50, SENSEX, NIFTY BANK boxes only -- the marquee should show only these 3 indices in 3 boxes, not all 6)
- Create new page `/index-detail/:indexId` that shows the top companies for that index
  - NIFTY 50 detail: Reliance Industries Ltd. (Diversified conglomerate), HDFC Bank Ltd. (Financial Services), Bharti Airtel Ltd. (Telecommunications), ICICI Bank Ltd. (Financial Services), Infosys Ltd. (Information Technology)
  - SENSEX detail: Reliance Industries, HDFC Bank, ICICI Bank, Infosys, Tata Consultancy Services (TCS), Bharti Airtel, State Bank of India (SBI), Larsen & Toubro (L&T)
  - NIFTY BANK detail: State Bank of India (SBI), IndusInd Bank Ltd., AU Small Finance Bank Ltd., Bandhan Bank Ltd., Bank of Baroda, IDFC First Bank, Punjab National Bank

### Modify
- Reduce marquee to only show 3 boxes: NIFTY 50, SENSEX, NIFTY BANK (remove the other indices from the marquee data)
- Each marquee box gets a "Show Details" button that navigates to the index detail page
- In App.tsx add route for `/index-detail/:indexId`
- Replace logo src everywhere from `/assets/generated/trustcap-logo-transparent.dim_120x120.png` to `/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg`

### Remove
- Remove NIFTY IT, NIFTY MIDCAP 100, NIFTY FMCG from the marquee (keep only 3 indices)

## Implementation Plan
1. Replace all logo `src` references in LandingPage.tsx and DashboardPage.tsx with the uploaded image path
2. Reduce MOCK_INDICES to only the 3 relevant indices (NIFTY 50, SENSEX, NIFTY BANK)
3. Add "Show Details" button to each marquee card in DashboardPage.tsx that navigates to `/index-detail/NIFTY50`, `/index-detail/SENSEX`, `/index-detail/NIFTYBANK`
4. Create new `IndexDetailPage.tsx` with company lists for each index
5. Add the new route `/index-detail/$indexId` in App.tsx
