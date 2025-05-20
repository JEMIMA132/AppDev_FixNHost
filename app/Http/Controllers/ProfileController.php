<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:50',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'profile_pic' => 'nullable|string', // base64 or path
        ]);

        // If profile_pic is a base64 string, handle upload (optional)
        if ($request->profile_pic && str_starts_with($request->profile_pic, 'data:image')) {
            $image = $request->profile_pic;
            $imageName = uniqid() . '.png';
            $imagePath = 'profile_pics/' . $imageName;
            \Storage::disk('public')->put($imagePath, file_get_contents($image));
            $validated['profile_pic'] = $imagePath;
        }

        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile
        ]);
    }
} 