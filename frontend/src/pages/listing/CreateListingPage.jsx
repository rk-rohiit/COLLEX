import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createListing, clearCreateState } from "@/features/listing/listingSlice";
import { useNavigate } from "react-router-dom";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const tokens = {
  navy: "#0F1E3C",
  navyLight: "#1E3A8A",
  accent: "#E07B39",
  accentLight: "#FDF0E6",
  surface: "#FFFFFF",
  surfaceAlt: "#F7F8FC",
  border: "#E4E7EF",
  borderFocus: "#1E3A8A",
  textPrimary: "#0F1E3C",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  success: "#059669",
  successLight: "#ECFDF5",
  danger: "#DC2626",
  dangerLight: "#FEF2F2",
  radius: "10px",
  radiusLg: "14px",
  shadow: "0 1px 3px rgba(15,30,60,0.06), 0 4px 12px rgba(15,30,60,0.04)",
  shadowMd: "0 4px 16px rgba(15,30,60,0.08), 0 1px 4px rgba(15,30,60,0.05)",
};

// ─── Reusable Primitives ──────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label style={{
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: tokens.textSecondary,
    marginBottom: 6,
  }}>
    {children}
    {required && <span style={{ color: tokens.accent, marginLeft: 3 }}>*</span>}
  </label>
);

const Input = ({ style, ...props }) => (
  <input
    {...props}
    style={{
      width: "100%",
      height: 42,
      padding: "0 14px",
      fontSize: 14,
      color: tokens.textPrimary,
      background: tokens.surface,
      border: `1.5px solid ${tokens.border}`,
      borderRadius: tokens.radius,
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.15s",
      fontFamily: "inherit",
      ...style,
    }}
    onFocus={e => (e.target.style.borderColor = tokens.borderFocus)}
    onBlur={e => (e.target.style.borderColor = tokens.border)}
  />
);

const Select = ({ children, style, ...props }) => (
  <select
    {...props}
    style={{
      width: "100%",
      height: 42,
      padding: "0 14px",
      fontSize: 14,
      color: tokens.textPrimary,
      background: tokens.surface,
      border: `1.5px solid ${tokens.border}`,
      borderRadius: tokens.radius,
      outline: "none",
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
      boxSizing: "border-box",
      transition: "border-color 0.15s",
      fontFamily: "inherit",
      cursor: "pointer",
      ...style,
    }}
    onFocus={e => (e.target.style.borderColor = tokens.borderFocus)}
    onBlur={e => (e.target.style.borderColor = tokens.border)}
  >
    {children}
  </select>
);

const Textarea = ({ style, ...props }) => (
  <textarea
    {...props}
    style={{
      width: "100%",
      padding: "12px 14px",
      fontSize: 14,
      color: tokens.textPrimary,
      background: tokens.surface,
      border: `1.5px solid ${tokens.border}`,
      borderRadius: tokens.radius,
      outline: "none",
      resize: "vertical",
      boxSizing: "border-box",
      transition: "border-color 0.15s",
      fontFamily: "inherit",
      lineHeight: 1.6,
      minHeight: 110,
      ...style,
    }}
    onFocus={e => (e.target.style.borderColor = tokens.borderFocus)}
    onBlur={e => (e.target.style.borderColor = tokens.border)}
  />
);

const Card = ({ children, style }) => (
  <div style={{
    background: tokens.surface,
    borderRadius: tokens.radiusLg,
    border: `1px solid ${tokens.border}`,
    boxShadow: tokens.shadow,
    padding: "28px 28px",
    ...style,
  }}>
    {children}
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: tokens.textPrimary }}>{children}</h3>
    {subtitle && <p style={{ margin: "3px 0 0", fontSize: 12.5, color: tokens.textMuted }}>{subtitle}</p>}
  </div>
);

const FieldRow = ({ children, cols = 2 }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 16,
  }}>
    {children}
  </div>
);

const Field = ({ children }) => <div>{children}</div>;

// ─── Step Indicator ──────────────────────────────────────────────────────────
const steps = ["Item Details", "Pricing", "Photos"];
const StepBar = ({ current }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
    {steps.map((s, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={s}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
              background: done || active ? tokens.navyLight : tokens.surfaceAlt,
              color: done || active ? "#fff" : tokens.textMuted,
              border: `1.5px solid ${done || active ? tokens.navyLight : tokens.border}`,
              flexShrink: 0,
              transition: "all 0.2s",
            }}>
              {done ? "✓" : i + 1}
            </div>
            <span style={{
              fontSize: 13, fontWeight: active ? 600 : 400,
              color: active ? tokens.textPrimary : done ? tokens.navyLight : tokens.textMuted,
            }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 1.5, margin: "0 12px",
              background: done ? tokens.navyLight : tokens.border,
              transition: "background 0.3s",
            }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Type Toggle ──────────────────────────────────────────────────────────────
const TypeToggle = ({ value, onChange }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "1fr 1fr",
    border: `1.5px solid ${tokens.border}`,
    borderRadius: tokens.radius, overflow: "hidden",
  }}>
    {[{ val: "sell", label: "Sell", icon: "→" }, { val: "rent", label: "Rent Out", icon: "↻" }].map(opt => (
      <button
        key={opt.val}
        onClick={() => onChange(opt.val)}
        style={{
          padding: "10px 0",
          fontSize: 13, fontWeight: 600,
          border: "none", cursor: "pointer",
          background: value === opt.val ? tokens.navyLight : tokens.surface,
          color: value === opt.val ? "#fff" : tokens.textSecondary,
          transition: "all 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <span style={{ fontSize: 14 }}>{opt.icon}</span> {opt.label}
      </button>
    ))}
  </div>
);

// ─── Condition Badge Selector ─────────────────────────────────────────────────
const conditions = [
  { val: "new", label: "Brand New" },
  { val: "like new", label: "Like New" },
  { val: "good", label: "Good" },
  { val: "fair", label: "Fair / Used" },
];
const ConditionPicker = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    {conditions.map(c => (
      <button
        key={c.val}
        onClick={() => onChange(c.val)}
        style={{
          padding: "7px 14px",
          fontSize: 12.5, fontWeight: 600,
          border: `1.5px solid ${value === c.val ? tokens.navyLight : tokens.border}`,
          borderRadius: 20,
          cursor: "pointer",
          background: value === c.val ? tokens.navyLight : tokens.surface,
          color: value === c.val ? "#fff" : tokens.textSecondary,
          transition: "all 0.15s",
        }}
      >
        {c.label}
      </button>
    ))}
  </div>
);

// ─── Image Uploader ──────────────────────────────────────────────────────────
const ImageUploader = ({ images, onUpload, onAddUrl, onRemove, imageInput, setImageInput }) => (
  <div>
    <div style={{
      border: `2px dashed ${tokens.border}`,
      borderRadius: tokens.radiusLg,
      padding: "28px 20px",
      textAlign: "center",
      background: tokens.surfaceAlt,
      cursor: "pointer",
      position: "relative",
      transition: "border-color 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = tokens.borderFocus}
      onMouseLeave={e => e.currentTarget.style.borderColor = tokens.border}
    >
      <label style={{ cursor: "pointer", display: "block" }}>
        <input type="file" hidden multiple accept="image/*" onChange={onUpload} />
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(30,58,138,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 12px",
        }}>
          <CloudUploadIcon style={{ fontSize: 22, color: tokens.navyLight }} />
        </div>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: tokens.textPrimary }}>
          Drop photos here or <span style={{ color: tokens.navyLight }}>browse</span>
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: tokens.textMuted }}>
          PNG, JPG up to 10MB · Max 5 images
        </p>
      </label>
    </div>

    {/* URL Input */}
    <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
      <div style={{ position: "relative", flex: 1 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
          <AddLinkIcon style={{ fontSize: 16, color: tokens.textMuted }} />
        </span>
        <Input
          placeholder="Or paste an image URL…"
          value={imageInput}
          onChange={e => setImageInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onAddUrl()}
          style={{ paddingLeft: 36, fontSize: 13 }}
        />
      </div>
      <button
        onClick={onAddUrl}
        style={{
          height: 42, padding: "0 16px",
          background: tokens.surfaceAlt,
          border: `1.5px solid ${tokens.border}`,
          borderRadius: tokens.radius,
          fontSize: 13, fontWeight: 600,
          color: tokens.textPrimary, cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>

    {/* Slot Grid */}
    {images.length > 0 && (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 10, marginTop: 16,
      }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: tokens.radius, overflow: "hidden", border: `1px solid ${tokens.border}` }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {i === 0 && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "rgba(30,58,138,0.85)",
                color: "#fff", fontSize: 10, fontWeight: 700,
                textAlign: "center", padding: "3px 0", letterSpacing: "0.05em",
              }}>COVER</div>
            )}
            <button
              onClick={() => onRemove(i)}
              style={{
                position: "absolute", top: 5, right: 5,
                width: 22, height: 22, borderRadius: "50%",
                background: tokens.danger, border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <DeleteIcon style={{ fontSize: 12, color: "#fff" }} />
            </button>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 5 - images.length) }).map((_, i) => (
          <div key={`empty-${i}`} style={{
            aspectRatio: "1",
            borderRadius: tokens.radius,
            border: `1.5px dashed ${tokens.border}`,
            background: tokens.surfaceAlt,
          }} />
        ))}
      </div>
    )}
  </div>
);

// ─── Price Input ──────────────────────────────────────────────────────────────
const PriceInput = ({ value, onChange, name, label }) => (
  <div style={{ position: "relative" }}>
    <span style={{
      position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
      fontSize: 14, color: tokens.textMuted, fontWeight: 600, zIndex: 1,
    }}>₹</span>
    <Input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="0"
      style={{ paddingLeft: 30 }}
    />
  </div>
);

// ─── Publish Button ──────────────────────────────────────────────────────────
const PublishButton = ({ loading, onClick }) => (
  <button
    onClick={onClick}
    disabled={loading}
    style={{
      width: "100%",
      height: 50,
      background: loading ? tokens.border : `linear-gradient(135deg, ${tokens.navy} 0%, ${tokens.navyLight} 100%)`,
      color: loading ? tokens.textMuted : "#fff",
      border: "none",
      borderRadius: tokens.radius,
      fontSize: 15, fontWeight: 700,
      cursor: loading ? "not-allowed" : "pointer",
      letterSpacing: "0.02em",
      boxShadow: loading ? "none" : "0 4px 14px rgba(30,58,138,0.35)",
      transition: "all 0.2s",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}
  >
    {loading ? (
      <>
        <span style={{
          width: 16, height: 16, border: `2px solid ${tokens.textMuted}`,
          borderTopColor: "transparent", borderRadius: "50%",
          display: "inline-block",
          animation: "spin 0.7s linear infinite",
        }} />
        Publishing…
      </>
    ) : "Publish Listing →"}
  </button>
);

// ─── Summary Sidebar Card ─────────────────────────────────────────────────────
const SummaryCard = ({ form }) => {
  const completeness = [
    form.title, form.description, form.price,
    form.category, form.location, form.images.length > 0,
  ].filter(Boolean).length;
  const pct = Math.round((completeness / 6) * 100);

  return (
    <Card style={{ padding: "22px 22px" }}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: tokens.textMuted, letterSpacing: "0.07em", textTransform: "uppercase" }}>
        Listing Progress
      </p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: tokens.textPrimary }}>{pct}%</span>
        <span style={{ fontSize: 12, color: tokens.textMuted }}>complete</span>
      </div>
      <div style={{
        height: 6, background: tokens.border,
        borderRadius: 99, overflow: "hidden", marginBottom: 16,
      }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: `${pct}%`,
          background: pct === 100 ? tokens.success : tokens.navyLight,
          transition: "width 0.4s ease",
        }} />
      </div>
      {[
        ["Title", !!form.title],
        ["Description", !!form.description],
        ["Price", !!form.price],
        ["Category", !!form.category],
        ["Location", !!form.location],
        ["Photos", form.images.length > 0],
      ].map(([label, done]) => (
        <div key={label} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "7px 0",
          borderBottom: `1px solid ${tokens.border}`,
          fontSize: 13,
        }}>
          <span style={{ color: tokens.textSecondary }}>{label}</span>
          <span style={{
            width: 18, height: 18, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: done ? tokens.successLight : tokens.surfaceAlt,
            color: done ? tokens.success : tokens.textMuted,
            fontSize: 11, fontWeight: 700,
            border: `1px solid ${done ? "#A7F3D0" : tokens.border}`,
          }}>
            {done ? "✓" : "·"}
          </span>
        </div>
      ))}
    </Card>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CreateListingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading, createSuccess, error } = useSelector((state) => state.listing);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    type: "sell",
    condition: "good",
    location: "",
    images: [],
    rentPeriod: "monthly",
    rentDeposit: "",
  });

  const [imageInput, setImageInput] = useState("");
  const [step, setStep] = useState(0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addImage = () => {
    if (!imageInput) return;
    if (!imageInput.startsWith("http")) {
      toast.error("Enter a valid image URL");
      return;
    }
    if (form.images.length >= 5) {
      toast.error("Max 5 images allowed");
      return;
    }
    setForm({ ...form, images: [...form.images, imageInput.trim()] });
    setImageInput("");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (form.images.length + files.length > 5) {
      toast.error("Max 5 images allowed");
      return;
    }
    const localImages = files.map((f) => URL.createObjectURL(f));
    setForm({ ...form, images: [...form.images, ...localImages] });
  };

  const removeImage = (index) =>
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.price || !form.category || !form.location || form.images.length === 0) {
      toast.error("Please fill in all required fields and add at least one image.");
      return;
    }
    dispatch(createListing({
      ...form,
      price: Number(form.price),
      rentDeposit: form.rentDeposit ? Number(form.rentDeposit) : undefined,
    }));
  };

  useEffect(() => {
    if (createSuccess) {
      toast.success("Listing published! 🎉");
      dispatch(clearCreateState());
      navigate("/profile");
    }
  }, [createSuccess, dispatch, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Auto-advance step indicator based on form state
  useEffect(() => {
    if (form.images.length > 0) setStep(2);
    else if (form.price) setStep(1);
    else if (form.title) setStep(0);
  }, [form]);

  return (
    <div style={{ background: "#F0F2F8", minHeight: "100vh", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

      {/* Top Bar */}
      <div style={{
        background: tokens.surface,
        borderBottom: `1px solid ${tokens.border}`,
        padding: "0 32px",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: tokens.navyLight,
            borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 14 }}>◈</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: tokens.textPrimary }}>CampusMarket</span>
        </div>
        <span style={{
          fontSize: 12, fontWeight: 600,
          padding: "4px 12px",
          border: `1.5px solid ${tokens.border}`,
          borderRadius: 20, color: tokens.textSecondary,
        }}>New Listing</span>
      </div>

      {/* Page Content */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 60px" }}>
        {/* Page Title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: tokens.textPrimary }}>
            Create a listing
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: 14, color: tokens.textMuted }}>
            Sell or rent your items to the university community
          </p>
        </div>

        <StepBar current={step} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          alignItems: "start",
        }}>
          {/* ── Left Column ─────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Item Information */}
            <Card>
              <SectionTitle subtitle="Tell buyers what you're offering">Item information</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <Label required>Listing title</Label>
                  <Input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Engineering Graphics Drafter Set" />
                </div>
                <FieldRow>
                  <div>
                    <Label required>Category</Label>
                    <Select name="category" value={form.category} onChange={handleChange}>
                      <option value="" disabled>Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="books">Books & Notes</option>
                      <option value="furniture">Furniture</option>
                      <option value="stationery">Stationery</option>
                      <option value="clothing">Clothing</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                  <div>
                    <Label>Pickup location</Label>
                    <Input name="location" value={form.location} onChange={handleChange} placeholder="e.g., Block B, Hostel 4 Lobby" />
                  </div>
                </FieldRow>
                <div>
                  <Label>Condition</Label>
                  <ConditionPicker value={form.condition} onChange={val => setForm({ ...form, condition: val })} />
                </div>
                <div>
                  <Label required>Description</Label>
                  <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the item's features, what's included, any defects, and why you're selling…"
                  />
                </div>
              </div>
            </Card>

            {/* Pricing */}
            <Card>
              <SectionTitle subtitle="Set your price and listing type">Pricing & type</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <Label>Listing type</Label>
                  <TypeToggle value={form.type} onChange={val => setForm({ ...form, type: val })} />
                </div>
                <FieldRow cols={form.type === "rent" ? 3 : 1}>
                  <div>
                    <Label required>{form.type === "rent" ? "Rent price" : "Selling price"}</Label>
                    <PriceInput name="price" value={form.price} onChange={handleChange} />
                  </div>
                  {form.type === "rent" && (
                    <>
                      <div>
                        <Label>Rent period</Label>
                        <Select name="rentPeriod" value={form.rentPeriod} onChange={handleChange}>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </Select>
                      </div>
                      <div>
                        <Label>Security deposit</Label>
                        <PriceInput name="rentDeposit" value={form.rentDeposit} onChange={handleChange} />
                      </div>
                    </>
                  )}
                </FieldRow>
                {form.type === "rent" && form.price && (
                  <div style={{
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    borderRadius: tokens.radius,
                    padding: "12px 16px",
                    fontSize: 13,
                    color: "#1D4ED8",
                  }}>
                    Renters will pay <strong>₹{form.price}</strong> per {form.rentPeriod || "period"}
                    {form.rentDeposit ? ` + ₹${form.rentDeposit} deposit` : ""}.
                  </div>
                )}
              </div>
            </Card>

            {/* Photos */}
            <Card>
              <SectionTitle subtitle={`${form.images.length}/5 photos added · First photo is the cover`}>
                Item photos
              </SectionTitle>
              <ImageUploader
                images={form.images}
                onUpload={handleImageUpload}
                onAddUrl={addImage}
                onRemove={removeImage}
                imageInput={imageInput}
                setImageInput={setImageInput}
              />
            </Card>
          </div>

          {/* ── Right Column ────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 24 }}>
            <SummaryCard form={form} />

            <Card style={{ padding: "20px 22px" }}>
              <PublishButton loading={createLoading} onClick={handleSubmit} />
              <p style={{ margin: "12px 0 0", fontSize: 12, color: tokens.textMuted, textAlign: "center", lineHeight: 1.5 }}>
                By publishing you agree to our{" "}
                <span style={{ color: tokens.navyLight, cursor: "pointer" }}>listing guidelines</span>.
              </p>
            </Card>

            {/* Tips Card */}
            <Card style={{ padding: "18px 22px", background: tokens.accentLight, borderColor: "#F5C6A0" }}>
              <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: "#92400E", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Tips for faster sales
              </p>
              {[
                "Use clear, well-lit photos",
                "Set a competitive price",
                "Add a detailed description",
                "Specify the pickup point",
              ].map(tip => (
                <div key={tip} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                  <span style={{ color: tokens.accent, fontSize: 12, marginTop: 1, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 12.5, color: "#78350F", lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;