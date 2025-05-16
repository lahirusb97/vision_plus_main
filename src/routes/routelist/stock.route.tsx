import { RouteObject } from "react-router";
import AddFrames from "../../view/stock/AddFrames";
import FrameStore from "../../view/stock/FrameStore";
import AddLense from "../../view/stock/AddLense";
import LenseStore from "../../view/stock/LenseStore";
import AddVariation from "../../view/stock/AddVariation";
import OtherItemStore from "../../view/stock/otherItem/OtherItemStore";
import ProtectedChildRoute from "../ProtectedChildRoute";
import LenseHistory from "../../view/stock/lense/LenseHistory";
import LenseEdit from "../../view/stock/lense/LenseEdit";
import FrameEdit from "../../view/stock/frame/FrameEdit";
import FrameUpdate from "../../view/stock/frame/FrameUpdate";
import FrameHIstory from "../../view/stock/frame/FrameHIstory";
import LenseUpdate from "../../view/stock/lense/LenseUpdate";
import OtherItemHistory from "../../view/stock/OtherItemHistory";
import OtherItemQtyUpdate from "../../view/stock/otherItem/OtherItemQtyUpdate";
import OtherItemEdit from "../../view/stock/otherItem/OtherItemEdit";
import LenseTypeAdd from "../../view/stock/lense/LenseTypeAdd";
import LenseTypeEdit from "../../view/stock/lense/LenseTypeEdit";
import LenseBrandAdd from "../../view/stock/lense/LenseBrandAdd";
import LenseBrandEdit from "../../view/stock/lense/LenseBrandEdit";
import FrameBrandAdd from "../../view/stock/frame/FrameBrandAdd";
import FrameBrandEdit from "../../view/stock/frame/FrameBrandEdit";
import LenseCoatingAdd from "../../view/stock/lense/LenseCoatingAdd";
import LenseCoatingEdit from "../../view/stock/lense/LenseCoatingEdit";
import ColorsAdd from "../../view/stock/frame/ColorsAdd";
import ColorsEdit from "../../view/stock/frame/ColorsEdit";
import FrameCodeEdit from "../../view/stock/frame/FrameCodeEdit";
import FrameCodeAdd from "../../view/stock/frame/FrameCodeAdd";
import OtherItemCreate from "../../view/stock/otherItem/OtherItemCreate";
import ExternalLensStore from "../../view/stock/external_lens/ExternalLensStore";
import ExternalLensCreate from "../../view/stock/external_lens/ExternalLensCreate";
import ExternalLensUpdate from "../../view/stock/external_lens/ExternalLensUpdate";
import ExternalFactoryCreate from "../../view/stock/external_lens/external_factory/ExternalFactoryCreate";
import ExternalFactoryUpdate from "../../view/stock/external_lens/external_factory/ExternalFactoryUpdate";
import ExternalCoatingCreate from "../../view/stock/external_lens/external_coating/ExternalCoatingCreate";
import ExternalCoatingUpdate from "../../view/stock/external_lens/external_coating/ExternalCoatingUpdate";
import FrameFullEdit from "../../view/stock/frame/FrameFullEdit";
export const stockRoutes: RouteObject[] = [
  {
    path: "add_frames",
    element: <AddFrames />,
  },
  {
    path: "frame_store",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FrameStore />,
      },
      {
        path: "update/:id",
        element: <FrameUpdate />,
      },
      {
        path: "edit/:id",
        element: <FrameEdit />,
      },
      {
        path: "full_edit/:id",
        element: <FrameFullEdit />,
      },
      {
        path: "history/:id",
        element: <FrameHIstory />,
      },
    ],
  },
  {
    path: "add_lense",
    element: <AddLense />,
  },
  {
    path: "lens_store",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <LenseStore />,
      },
      {
        path: "update/:id",
        element: <LenseUpdate />,
      },
      {
        path: "edit/:id",
        element: <LenseEdit />,
      },
      {
        path: "history/:id",
        element: <LenseHistory />,
      },
    ],
  },
  {
    path: "add_variation",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <AddVariation />,
      },
      {
        path: "lense_type",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <LenseTypeAdd />,
          },
          {
            path: ":id",
            element: <LenseTypeEdit />,
          },
        ],
      },
      {
        path: "lense_brand",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <LenseBrandAdd />,
          },
          {
            path: ":id",
            element: <LenseBrandEdit />,
          },
        ],
      },
      {
        path: "frame_brand",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <FrameBrandAdd />,
          },
          {
            path: ":id",
            element: <FrameBrandEdit />,
          },
        ],
      },
      {
        path: "lens_coatings",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <LenseCoatingAdd />,
          },
          {
            path: ":id",
            element: <LenseCoatingEdit />,
          },
        ],
      },
      {
        path: "color",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <ColorsAdd />,
          },
          {
            path: ":id",
            element: <ColorsEdit />,
          },
        ],
      },
      {
        path: "frame_code",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <FrameCodeAdd />,
          },
          {
            path: ":id",
            element: <FrameCodeEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "other_item_stock",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <OtherItemStore />,
      },

      {
        path: "edit/:id",
        element: <OtherItemEdit />,
      },
      {
        path: "update/:id",
        element: <OtherItemQtyUpdate />,
      },
      {
        path: "history/:id",
        element: <OtherItemHistory />,
      },
    ],
  },
  {
    path: "add_other_item",
    element: <OtherItemCreate />,
  },
  {
    path: "external_lense",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <ExternalLensStore />,
      },
      {
        path: "create",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <ExternalLensCreate />,
          },
          {
            path: "lense_factory",
            element: <ExternalFactoryCreate />,
          },
          {
            path: "lense_factory/:lense_factory_id",
            element: <ExternalFactoryUpdate />,
          },
          {
            path: "lense_coating",
            element: <ExternalCoatingCreate />,
          },
          {
            path: "lense_coating/:lense_coating_id",
            element: <ExternalCoatingUpdate />,
          },
        ],
      },
      {
        path: "update/:external_lens_id",
        element: <ExternalLensUpdate />,
      },
    ],
  },
];
