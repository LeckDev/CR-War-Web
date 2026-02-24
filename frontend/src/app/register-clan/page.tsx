"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterClanPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tag: "",
    warningThreshold: 1800,
    promotionThreshold: 2800,
    userId: "user-test-001", // On simulera l'ID en attendant l'auth complète
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5225/api/clans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Clan enregistré avec succès ! ID: ${data.clanId}`);
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.detail}`);
      }
    } catch (err) {
      alert("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enregistrer mon Clan</CardTitle>
          <CardDescription>
            Indiquez le tag de votre clan pour créer votre vitrine de gestion.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Tag du Clan</Label>
              <Input
                id="tag"
                placeholder="#"
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="warnings">Seuil Avertissements</Label>
                <Input
                  id="warnings"
                  type="number"
                  value={formData.warningThreshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      warningThreshold: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo">Seuil Promotion (Dons)</Label>
                <Input
                  id="promo"
                  type="number"
                  value={formData.promotionThreshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      promotionThreshold: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Vérification sur Clash Royale..."
                : "Enregistrer le Clan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
