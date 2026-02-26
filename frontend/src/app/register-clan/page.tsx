"use client";

import { useState } from "react";
// 1. On importe le hook useAuth de Clerk
import { useAuth } from "@clerk/nextjs";
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
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tag: "",
    warningThreshold: 1800,
    promotionThreshold: 2800,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:5225/api/clans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        debugger;
        const data = await response.json();
        alert(`Clan enregistré avec succès ! ID: ${data.clanId}`); // On utilise .id (Guid)
      } else if (response.status === 401) {
        alert("Session expirée ou invalide. Veuillez vous reconnecter.");
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.detail || "Une erreur est survenue"}`);
      }
    } catch (err) {
      alert("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader>
          <CardTitle>Enregistrer mon Clan</CardTitle>
          <CardDescription>
            Ajouter votre clan et vos paramètres de guerres de clan
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
