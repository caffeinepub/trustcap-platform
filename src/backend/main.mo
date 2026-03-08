import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  type UserProfile = {
    name : Text;
    description : Text;
    email : Text;
    phone : Text;
  };

  type MarketIndex = {
    name : Text;
    symbol : Text;
    value : Float;
    changeAmount : Float;
    changePercent : Float;
  };

  type Company = {
    name : Text;
    ticker : Text;
    price : Float;
    changePercent : Float;
    sector : Text;
    description : Text;
    week52High : Float;
    week52Low : Float;
    marketCap : Float;
  };

  type Commodity = {
    name : Text;
    ticker : Text;
    price : Float;
    changePercent : Float;
    category : Text;
    description : Text;
    week52High : Float;
    week52Low : Float;
    volume : Float;
  };

  module MarketIndex {
    public func compare(index1 : MarketIndex, index2 : MarketIndex) : Order.Order {
      Text.compare(index1.symbol, index2.symbol);
    };
  };

  module Company {
    public func compareBySector(company1 : Company, company2 : Company) : Order.Order {
      Text.compare(company1.sector, company2.sector);
    };
  };

  module Commodity {
    public func compareByCategory(commodity1 : Commodity, commodity2 : Commodity) : Order.Order {
      Text.compare(commodity1.category, commodity2.category);
    };
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let companies = Map.empty<Text, Company>();
  let commodities = Map.empty<Text, Commodity>();
  let marketIndices = Map.empty<Text, MarketIndex>();

  // Initialize static data
  public shared ({ caller }) func initializeStaticData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can initialize data");
    };

    // Market indices
    marketIndices.add("NIFTY50", {
      name = "Nifty 50";
      symbol = "NIFTY50";
      value = 15670.25;
      changeAmount = 120.45;
      changePercent = 0.77;
    });
    marketIndices.add("SENSEX", {
      name = "Sensex";
      symbol = "SENSEX";
      value = 52450.67;
      changeAmount = 345.23;
      changePercent = 0.66;
    });
    marketIndices.add("NIFTYBANK", {
      name = "Nifty Bank";
      symbol = "NIFTYBANK";
      value = 34521.11;
      changeAmount = 210.98;
      changePercent = 0.61;
    });

    // Companies
    companies.add("RELIANCE", {
      name = "Reliance Industries";
      ticker = "RELIANCE";
      price = 2450.50;
      changePercent = 1.12;
      sector = "Conglomerate";
      description = "Large Indian multinational conglomerate.";
      week52High = 2650.75;
      week52Low = 2000.30;
      marketCap = 1600000.00;
    });
    companies.add("TCS", {
      name = "Tata Consultancy Services";
      ticker = "TCS";
      price = 3250.75;
      changePercent = -0.45;
      sector = "Information Technology";
      description = "Leading IT services, consulting & business solutions organization.";
      week52High = 3600.20;
      week52Low = 2900.00;
      marketCap = 1200000.00;
    });
    // Add more companies...

    // Commodities
    commodities.add("GOLD", {
      name = "Gold";
      ticker = "GOLD";
      price = 49500.00;
      changePercent = 0.25;
      category = "Metals";
      description = "Precious metal used as an investment and jewelry.";
      week52High = 52000.00;
      week52Low = 47000.00;
      volume = 10000.00;
    });
    commodities.add("SILVER", {
      name = "Silver";
      ticker = "SILVER";
      price = 65000.00;
      changePercent = -0.15;
      category = "Metals";
      description = "Precious metal used in various industries.";
      week52High = 70000.00;
      week52Low = 60000.00;
      volume = 20000.00;
    });
    // Add more commodities...
  };

  // User profile management
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Market data
  public query ({ caller }) func getMarketIndices() : async [MarketIndex] {
    marketIndices.values().toArray().sort();
  };

  public query ({ caller }) func getEquities() : async [Company] {
    companies.values().toArray();
  };

  public query ({ caller }) func getEquitiesBySector() : async [Company] {
    companies.values().toArray().sort(Company.compareBySector);
  };

  public query ({ caller }) func getCommodities() : async [Commodity] {
    commodities.values().toArray();
  };

  public query ({ caller }) func getCommoditiesByCategory() : async [Commodity] {
    commodities.values().toArray().sort(Commodity.compareByCategory);
  };

  public query ({ caller }) func getInstrumentDetail(ticker : Text) : async {
    #company : Company;
    #commodity : Commodity;
  } {
    switch (companies.get(ticker)) {
      case (?company) { #company(company) };
      case (null) {
        switch (commodities.get(ticker)) {
          case (?commodity) { #commodity(commodity) };
          case (null) { Runtime.trap("Instrument not found") };
        };
      };
    };
  };
};
