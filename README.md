# Zombie Survival

## General

This demo project showcases a **SPA** with a **React** frontend and a **FastAPI** backend. The backend uses **SQLAlchemy** for database management and operates with an in-memory database, meaning recorded values are not persistent after a server restart.

The application can be run using Docker:

- `docker-compose up`

This command builds the **React** frontend, runs the **FastAPI** backend, and serves it on port 8000.

## Problem Description

ZSSN (Zombie Survival Social Network). The world as we know it has fallen into an apocalyptic scenario. A laboratory-made virus is transforming human beings and animals into zombies, hungry for fresh flesh.

You, as a zombie resistance member (and the last survivor who knows how to code), was designated to develop a system to share resources between non-infected humans.

## Backend Requirements

You will develop a **_REST API_**, which will store information about the survivors, as well as the resources they own.

In order to accomplish this, the API must fulfill the following use cases:

- **Add survivors to the database**

  A survivor must have a _name_, _age_, _gender_ and _last location (latitude, longitude)_.

  A survivor also has an inventory of resources of their own property (which you need to declare when upon the registration of the survivor).

- **Update survivor location**

  A survivor must have the ability to update their last location, storing the new latitude/longitude pair in the base (no need to track locations, just replacing the previous one is enough).

- **Flag survivor as infected**

  In a chaotic situation like that, it's inevitable that a survivor may get contaminated by the virus. When this happens, we need to flag the survivor as infected.

  An infected survivor cannot trade with others, can't access/manipulate their inventory, nor be listed in the reports (infected people are kinda dead anyway, see the item on reports below).

  **A survivor is marked as infected when at least three other survivors report their contamination.**

  When a survivor is infected, their inventory items become inaccessible (they cannot trade with others).

- **Survivors cannot Add/Remove items from inventory**

  Their belongings must be declared when they are first registered in the system. After that they can only change their inventory by means of trading with other survivors.

  The items allowed in the inventory are described above in the first feature.

- **Trade items**:

  Survivors can trade items among themselves.

  To do that, they must respect the price table below, where the value of an item is described in terms of points.

  Both sides of the trade should offer the same amount of points. For example, 1 Water and 1 Medication (1 x 4 + 1 x 2) is worth 6 ammunition (6 x 1) or 2 Food items (2 x 3).

  The trades themselves need not to be stored, but the items must be transferred from one survivor to the other.

| Item         | Points   |
| ------------ | -------- |
| 1 Water      | 4 points |
| 1 Food       | 3 points |
| 1 Medication | 2 points |
| 1 Ammunition | 1 point  |

## Frontend Requirements

You will develop a **_Web Application_**, which will display information about the survivors, as well as the resources they own.

The application must fulfill the following use cases:

- **Register survivors**: Provide a form to add new survivors to the database. The form should contain fields for the survivor's _name_, _age_, _gender_, _last location (latitude, longitude)_ and _inventory_.

- **Update survivor location**: Survivors should be able to update their last location. Provide a form to update the latitude/longitude.

- **Flag survivor as infected**: Provide a mechanism to flag a survivor as infected. This could be a button or a form in the survivor's profile.

- **Display survivor inventory**: Each survivor's profile should display their inventory of resources. Remember, survivors cannot add or remove items from their inventory directly.

- **Trade items**: Implement a feature to trade items between survivors. Ensure that the trade respects the point values of items.

## Technical Requirements

- The frontend should be a Single Page Application (SPA)
- You can use any JavaScript framework/library (React, Angular, Vue.js, etc.) for the frontend
- The application should be responsive and work on different devices (desktop, tablet, mobile)
- Write tests for your components and API endpoints
- Use version control (Git) and write meaningful commit messages
- The application should handle errors and edge cases. For example, it should display meaningful error messages if the API is down or a request fails.
- The application should have a clean and intuitive user interface. You can use a CSS framework (like Bootstrap or Material-UI) to help with this.
